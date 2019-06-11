import {pki, md, asn1} from 'node-forge';

const authorizeClientCertificate = (req, res, next) => {
    try {
        // Get header
        const header = req.get('X-ARR-ClientCert');
        if (!header) throw new Error('UNAUTHORIZED');

        // Convert from PEM to pki.CERT
        const pem = `-----BEGIN CERTIFICATE-----${header}-----END CERTIFICATE-----`;
        const incomingCert = pki.certificateFromPem(pem);

        console.log('issuer: ' + incomingCert.issuer);
        console.log('issuer hash: ' + incomingCert.issuer.hash);
        console.log('subject: ' + incomingCert.subject);
        console.log('subject has: ' + incomingCert.subject.hash.toLowerCase() );

        // // Validate certificate thumbprint
        // const fingerPrint = md.sha1.create().update(asn1.toDer((pki as any).certificateToAsn1(incomingCert)).getBytes()).digest().toHex();
        // if (fingerPrint.toLowerCase() !== 'abcdef1234567890abcdef1234567890abcdef12') throw new Error('UNAUTHORIZED');
        //
        // // Validate time validity
        // const currentDate = new Date();
        // if (currentDate < incomingCert.validity.notBefore || currentDate > incomingCert.validity.notAfter) throw new Error('UNAUTHORIZED');
        //
        // // Validate issuer
        // if (incomingCert.issuer.hash.toLowerCase() !== 'abcdef1234567890abcdef1234567890abcdef12') throw new Error('UNAUTHORIZED');
        //
        // // Validate subject
        // if (incomingCert.subject.hash.toLowerCase() !== 'abcdef1234567890abcdef1234567890abcdef12') throw new Error('UNAUTHORIZED');

        next();
    } catch (e) {
        if (e instanceof Error && e.message === 'UNAUTHORIZED') {
            res.status(401).send();
        } else {
            next(e);
        }
    }
};

export default authorizeClientCertificate;
