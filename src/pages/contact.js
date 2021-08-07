import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row, Form, FormGroup, Label, Input, Alert } from "reactstrap"
import SideBar from "../components/sideBar"

const ContactPage = () => {
  const [status, setStatus] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const notification = () => {
    if (isSubmitted && status === "SUCCESS") {
      return (
        <Alert
          color="success"
          isOpen={isSubmitted}
          toggle={() => setIsSubmitted(false)}
        >
          Message sent successfully
        </Alert>
      )
    } else if (isSubmitted && status === "ERROR") {
      return (
        <Alert
          color="danger"
          isOpen={isSubmitted}
          toggle={() => setIsSubmitted(false)}
        >
          Error sending message, Please fill all fields
        </Alert>
      )
    } else return null
  }

  // form submission
  const submitForm = ev => {
    ev.preventDefault()
    const form = ev.target

    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setStatus("SUCCESS")
        setIsSubmitted(true)
      } else {
        setStatus("ERROR")
        setIsSubmitted(true)
      }
    }
    xhr.send(data)
  }

  return (
    <Layout>
      <SEO title="Contact" />
      <div className="container pt-3">
        <h3 className="text-left">Contact Us</h3>
        <Row>
          <Col md="8">
            <Form
              action={`https://formspree.io/${process.env.GATSBY_FORM_API_KEY}`}
              method="POST"
              onSubmit={submitForm}
            >
              <FormGroup>
                <Label for="nameField">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="nameField"
                  placeholder="name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="emailField">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="emailField"
                  placeholder="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="messageField">Message</Label>
                <Input type="textarea" name="message" id="messageField" />
              </FormGroup>
              <button
                type="submit"
                className="btn rounded-pill btn-main mb-4 btn-block"
              >
                Submit
              </button>
              {notification()}
            </Form>
          </Col>
          <Col md="4">
            <SideBar />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default ContactPage
