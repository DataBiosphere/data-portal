/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating Zendesk request functionality.
 */

const ZENDESK_DOMAIN = "https://support.terra.bio";
const ZENDESK_API_REQUESTS = "api/v2/requests.json";
const ZENDESK_API_UPLOADS = "api/v2/uploads";

/**
 * Create support request.
 * 
 * @param {{attachmentToken, description, email, name, requestedFromUrl, subject, type}} 
 */
export async function createSupportRequest({attachmentToken, description, email, name, requestedFromUrl, subject, type}) {

    return await fetchWithErrorRejection(
        `${ZENDESK_DOMAIN}/${ZENDESK_API_REQUESTS}`,
        {
            body: JSON.stringify({
                request: {
                    comment: {
                        body: `${description}\n\n------------------\nSubmitted from: ${requestedFromUrl}`,
                        uploads: [attachmentToken]
                    },
                    custom_fields: [
                        {id: 360012782111, value: email},
                        {id: 360007369412, value: description},
                        {id: 360007369392, value: subject},
                        {id: 360012744452, value: type}
                    ],
                    requester: {
                        email,
                        name
                    },
                    subject,
                    ticket_form_id: 360000932232 
                }
            }),
            headers: {"Content-Type": "application/json"},
            method: "POST"
        }
    );
}

/**
 * Upload file to add as attachment to request.
 */
export async function uploadAttachment(file) {

    const res = await fetchWithErrorRejection(
        `${ZENDESK_DOMAIN}/${ZENDESK_API_UPLOADS}?filename=${file.name}`,
        {
            body: file,
            headers: {
                "Content-Type": "application/binary"
            },
            method: "POST"
        }
    );

    return (await res.json()).upload;
}

/**
 * Execute fetch, throwing error on non-200 response.
 */
async function fetchWithErrorRejection(...args) {

    const res = await fetch(...args);
    if (res.ok) {
        return res;
    }
    
    throw res;
}
