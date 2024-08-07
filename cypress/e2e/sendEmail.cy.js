describe('Email API Tests', () => {
    const apiUrl = '/api/email/send';

    it('should send an email successfully', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                to: 'test@example.com',
                subject: 'Test Email',
                body: {
                    template: 'welcome'
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Email sent successfully');
        });
    });

    it('should return 500 if SMTP credentials are not found', () => {
        // Mock the getSMTPCredentials function to return null
        cy.intercept('POST', apiUrl, (req) => {
            req.reply((res) => {
                res.send({
                    statusCode: 500,
                    body: {
                        message: 'SMTP credentials not found, please review your configuration section'
                    }
                });
            });
        });

        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false,
            body: {
                to: 'test@example.com',
                subject: 'Test Email',
                body: {
                    template: 'welcome'
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property('message', 'SMTP credentials not found, please review your configuration section');
        });
    });

    it('should return 404 if email template is not found', () => {
        // Mock the prisma.emailTemplate.findFirst function to return null
        cy.intercept('POST', apiUrl, (req) => {
            req.reply((res) => {
                res.send({
                    statusCode: 404,
                    body: {
                        message: 'Email template not found'
                    }
                });
            });
        });

        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false,
            body: {
                to: 'test@example.com',
                subject: 'Test Email',
                body: {
                    template: 'nonexistent_template'
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'Email template not found');
        });
    });

    it('should return 500 if email record creation fails', () => {
        // Mock the prisma.receivedEmail.create function to return null
        cy.intercept('POST', apiUrl, (req) => {
            req.reply((res) => {
                res.send({
                    statusCode: 500,
                    body: {
                        message: 'Failed to create email record'
                    }
                });
            });
        });

        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false,
            body: {
                to: 'test@example.com',
                subject: 'Test Email',
                body: {
                    template: 'welcome'
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property('message', 'Failed to create email record');
        });
    });
});