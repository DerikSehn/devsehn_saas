
describe('Email API', () => {
    it('should send an email successfully', () => {
        cy.request({
            method: 'POST',
            url: '/email/send',
            body: {
                to: 'example@example.com',
                subject: 'Test Email',
                body: {
                    template: 'contact_request'
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Email sent successfully');
        });
    });

    it('should fail to send an email with invalid data', () => {
        cy.request({
            method: 'POST',
            url: '/email/send',
            failOnStatusCode: false,
            body: {
                to: '',
                subject: '',
                body: {
                    template: ''
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body.message).to.eq('Failed to send email');
        });
    });
});
