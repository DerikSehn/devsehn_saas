import { EmailContent, EmailLink, EmailTemplate as EmailTemplateType } from "@prisma/client";
import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Row,
} from "@react-email/components";
import * as React from "react";

const { ADDRESS, PHONE_NUMBER } = process.env

const baseUrl = process.env.AWS_BUCKET_S3_LINK
    ? `https://${process.env.AWS_BUCKET_S3_LINK}`
    : "";


export const EmailTemplate = ({
    headerTitle,
    buttonLink,
    headerSubtitle,
    buttonText,
    footerText,
    content = [],
    links = []
}: EmailTemplateType & { links: EmailLink[], content: EmailContent[] }) => (
    <Html>
        <Head />
        <Preview>
            Cultura Verde - A excelência em paisagismo
        </Preview>
        <Body style={mainStyle}>
            <Container style={containerStyle}>
                <Section style={logoStyle}>
                    <Img width={150} style={{ minWidth: '' }} src={`${baseUrl}/email/logo.png`} />
                </Section>

                <Section style={headerStyle}>
                    <Row>
                        <Column style={headerContentStyle}>
                            <Heading style={headerContentTitleStyle}>{headerTitle}</Heading>
                            <Text style={headerContentSubtitleStyle}>{headerSubtitle}</Text>
                        </Column>
                        <Column style={headerImageContainerStyle}>
                            <Img
                                style={headerImageStyle}
                                width={340}
                                src={`${baseUrl}/email/hero.jpg`}
                            />
                        </Column>
                    </Row>
                </Section>

                <Section style={contentStyle}>
                    {content.map(({ heading, paragraph }) => <>
                        <Heading key={heading} as="h2" style={titleStyle}>
                            {heading}
                        </Heading>
                        <Text style={paragraphStyle}>{paragraph}</Text>
                        <Hr style={dividerStyle} />
                    </>
                    )}
                    {buttonText ?
                        <React.Fragment>

                            <Section style={buttonContainerStyle}>
                                <Link style={buttonStyle} href={buttonLink}>
                                    {buttonText}
                                </Link>
                            </Section>
                        </React.Fragment>
                        : null
                    }
                </Section>
            </Container>

            <Section style={footerStyle}>
                {links.length ? <>
                    {links.map(({ description, href }) =>
                        <Link key={href} href={href} style={footerLinkStyle}>
                            {description}
                        </Link>
                    )}
                </>
                    : null
                }
                <Text style={footerTextStyle}>
                    <strong>{footerText}</strong>
                </Text>
            </Section>
        </Body>
    </Html>
);
export default EmailTemplate;

const mainStyle = {
    backgroundColor: "#f3f3f5",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const headerContentStyle = { padding: "20px 30px 15px", maxWidth: '360px' };

const headerContentTitleStyle = {
    color: "#fff",
    fontSize: "27px",
    fontWeight: "bold",
    lineHeight: "27px",
};

const headerContentSubtitleStyle = {
    color: "#fff",
    fontSize: "17px",
};

const headerImageContainerStyle = {
    padding: "30px 10px",
};

const headerImageStyle = {
    maxWidth: "100%",
};

const titleStyle = {
    margin: "0 0 15px",
    fontWeight: "bold",
    fontSize: "21px",
    lineHeight: "21px",
    color: "#0c0d0e",
};

const paragraphStyle = {
    fontSize: "15px",
    lineHeight: "21px",
    color: "#3c3f44",
};

const dividerStyle = {
    margin: "30px 0",
};

const containerStyle = {
    width: "680px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#ffffff",
};

const footerStyle = {
    width: "680px",
    maxWidth: "100%",
    margin: "32px auto 0 auto",
    padding: "0 30px",
};

const contentStyle = {
    padding: "30px 30px 40px 30px",
};

const logoStyle = {
    display: "flex",
    background: "#f3f3f5",
    padding: "20px 30px",
};

const headerStyle = {
    borderRadius: "5px 5px 0 0",
    display: "flex",
    backgroundColor: "#835a0d",
};

const buttonContainerStyle = {
    marginTop: "24px",
    display: "block",
};

const buttonStyle = {
    backgroundColor: "#ecad3a",
    border: "1px solid #835a0d",
    fontSize: "17px",
    lineHeight: "17px",
    padding: "13px 17px",
    borderRadius: "10px",
    maxWidth: "120px",
    color: "#fff",
};

const footerDividerStyle = {
    ...dividerStyle,
    borderColor: "#d6d8db",
};

const footerTextStyle = {
    fontSize: "12px",
    lineHeight: "15px",
    color: "#9199a1",
    margin: "0",
};

const footerLinkStyle = {
    display: "inline-block",
    color: "#9199a1",
    textDecoration: "underline",
    fontSize: "12px",
    marginRight: "10px",
    marginBottom: "0",
    marginTop: "8px",
};

const footerAddressStyle = {
    margin: "4px 0",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#9199a1",
};
