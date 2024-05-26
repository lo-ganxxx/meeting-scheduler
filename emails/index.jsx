import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  

  const baseUrl = '';
  
  export const Email = ({
    userFirstName,
    duration,
    meetingTime,
    date,
    meetingUrl,
    businessName
  }) => {

  
    return (
      <Html>
        <Head />
        <Preview>Meeting scheduled</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img src={''} />
            </Section>
  
            <Section style={content}>
              {/* <Row>
                <Img
                  style={image}
                  width={620}
                  src={'logo here'}
                />
              </Row> */}
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi {userFirstName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                   Thank you for scheduling a meeting with {businessName},
                  </Heading>
                    <Text>Here are the details for your scheduled meeting:</Text>
                  <Text style={paragraph}>
                    <b>Time: </b>
                    {meetingTime}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Date: </b>
                    {date}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Location: </b>
                    {meetingUrl}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Duration: </b>
                    {duration} minutes
                  </Text>
                  <Text
                    style={{
                      color: "rgb(0,0,0, 0.5)",
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    *Please join the meeting at scheduled time on the link: {meetingUrl}
                  </Text>
  
                
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Join Now</Button>
                </Column>
              </Row>
            </Section>
  
            <Section style={containerImageFooter}>
              <Img
                style={image}
                width={620}
                src={'https://react-email-demo-7qy8spwep-resend.vercel.app/static/yelp-footer.png'}
              />
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              2024 | Meeting Scheduler, lo-ganxxx on GitHub | https://github.com/lo-ganxxx
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };

  export default Email;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    padding: "45px 0 0 0",
  };