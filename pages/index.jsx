import { useRef, useState, useEffect } from 'react';
import { resetIdCounter } from 'react-tabs';
import { NextSeo } from 'next-seo';
import Hero from '../components/Hero/Hero';
import Layout from '../components/Layout';
import Section from '../components/Section/Section';
import CustomTab from '../components/CustomTab/CustomTab';
import CardList from '../components/CardList/CardList';
import ServicesList from '../components/ServicesList/ServicesList';
import Contact from '../components/Contact/Contact';
import { fetchAPI, postAPI } from '../utils/api';

export default function Home({
  articles, projects, homepage, global,
}) {
  // We use useRef for the scrollspy of the Navbar
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // To avoid warning Warning: Prop `id` did not match. Server:
  // "react-tabs-84" Client: "react-tabs-0"
  // https://github.com/reactjs/react-tabs#resetidcounter-void
  resetIdCounter();

  // State variables for the controlled fields of the contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Variables to check if the required fields are filled
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  // Variable to check if email is conform to the regex
  const [mailRegexError, setMailRegexError] = useState(false);

  // Variables to display success or error messages or spinner
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [isContactError, setIsContactError] = useState(false);
  const [isContactSpam, setIsContactSpam] = useState(false);

  /**
   * Function to check if a required field is filled and set the error state
   * @param {string} fieldName - The name of the field to check
   * return {boolean} - True if the field is filled, false otherwise
   */
  const checkRequiredField = (fieldName) => {
    let result = false;
    switch (fieldName) {
      case 'name':
        if (!name) {
          setNameError(true);
          result = false;
        } else {
          setNameError(false);
          result = true;
        }
        break;
      case 'email':
        if (!email) {
          setEmailError(true);
          result = false;
        } else {
          setEmailError(false);
          result = true;
        }
        break;
      case 'subject':
        if (!subject) {
          setSubjectError(true);
          result = false;
        } else {
          setSubjectError(false);
          result = true;
        }
        break;
      case 'message':
        if (!message) {
          setMessageError(true);
          result = false;
        } else {
          setMessageError(false);
          result = true;
        }
        break;
      default:
        break;
    }
    return result;
  };

  /**
   * Function to check if the email is conform to the regex and set the error state
   * @returns {boolean} - True if the email is conform to the regex, false otherwise
   */
  const checkMailRegex = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setMailRegexError(true);
      return false;
    }
    setMailRegexError(false);
    return true;
  };

  /**
   * Function to handle change of a contact form field
   * @param {Event} event - The event triggered on field change
   */
  const handleContactFieldChange = (event) => {
    const { name: fieldName, value } = event.target;
    switch (fieldName) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  /**
   * Function to handle submit of the contact form
   * @param {Event} e - The event
   */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled and if email is conform to the regex
    if (checkRequiredField('name') && checkRequiredField('email') && checkMailRegex() && checkRequiredField('subject') && checkRequiredField('message')) {
      // we set the form messages to false and loading to true
      setIsContactLoading(true);
      setIsContactSuccess(false);
      setIsContactError(false);
      setIsContactSpam(false);
      // Send the email
      try {
        await postAPI('/messages', {
          name,
          email,
          subject,
          message,
        });
        // If there is no error, we set the success message to true and loading to false
        // and reset the form
        setIsContactLoading(false);
        setIsContactSuccess(true);
        setIsContactError(false);
        setIsContactSpam(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (error) {
        // If the error is a spam error, we set the spam message to true and loading to false
        if (error.message === 'spam') {
          setIsContactLoading(false);
          setIsContactSuccess(false);
          setIsContactError(false);
          setIsContactSpam(true);
        } else {
          // If the error is not a spam error, we set the error message to true and loading to false
          setIsContactLoading(false);
          setIsContactSuccess(false);
          setIsContactError(true);
          setIsContactSpam(false);
        }
      }
    }
  };

  // Because of framer motion page transition, we disabled scroll on next Link
  // so, in _app.jsx we scroll to the top of the page after exit animation
  // but here, we need to scroll to the ref when there is hash in the url
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      switch (hash) {
        case '#home':
          window.scrollTo({
            top: sectionRefs[0].current.offsetTop - 65,
          });
          break;
        case '#about':
          window.scrollTo({
            top: sectionRefs[1].current.offsetTop - 65,
          });
          break;
        case '#services':
          window.scrollTo({
            top: sectionRefs[2].current.offsetTop - 65,
          });
          break;
        case '#projects':
          window.scrollTo({
            top: sectionRefs[3].current.offsetTop - 65,
          });
          break;
        case '#blog':
          window.scrollTo({
            top: sectionRefs[4].current.offsetTop - 65,
          });
          break;
        case '#contact':
          window.scrollTo({
            top: sectionRefs[5].current.offsetTop - 65,
          });
          break;
        default:
          break;
      }
    }
  });

  return (
    <Layout
      global={global}
      sectionRefs={sectionRefs}
      stickyNav
    >
      <NextSeo
        title={homepage.seo.title}
        description={homepage.seo.metaDescription}
        openGraph={{
          // Title and description are mandatory
          title: homepage.seo.title,
          description: homepage.seo.metaDescription,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(homepage.seo.shareImage && {
            images: Object.values(homepage.seo.shareImage.formats).map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          }),
        }}
      />
      <Hero
        ref={sectionRefs[0]}
        title={homepage.hero.mainText}
        image={homepage.hero.picture}
        typewriterArray={homepage.hero.typewriter}
      />
      <Section
        ref={sectionRefs[1]}
        id="about"
        title={homepage.about.title}
        description={homepage.about.description}
      >
        <CustomTab columns={homepage.about.column} />
      </Section>
      <Section
        ref={sectionRefs[2]}
        id="services"
        title={homepage.services.title}
        description={homepage.services.description}
      >
        <ServicesList services={homepage.services} />
      </Section>
      <Section
        ref={sectionRefs[3]}
        id="projects"
        title={homepage.projects.title}
        description={homepage.projects.description}
      >
        <CardList items={projects} type="projects" />
      </Section>
      <Section
        ref={sectionRefs[4]}
        id="blog"
        title={homepage.blog.title}
        description={homepage.blog.description}
      >
        <CardList items={articles} type="blog" />
      </Section>
      <Section
        ref={sectionRefs[5]}
        id="contact"
        title={homepage.contact.title}
        description={homepage.contact.description}
      >
        <Contact
          nameValue={name}
          emailValue={email}
          subjectValue={subject}
          messageValue={message}
          checkRequiredField={checkRequiredField}
          checkEmail={checkMailRegex}
          nameError={nameError}
          emailError={emailError}
          mailRegexError={mailRegexError}
          subjectError={subjectError}
          messageError={messageError}
          onChange={handleContactFieldChange}
          onSubmit={handleContactSubmit}
          isError={isContactError}
          isSpam={isContactSpam}
          isSuccess={isContactSuccess}
          isLoading={isContactLoading}
        />
      </Section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // Run API calls in parallel
  const [articles, projects, homepage, global] = await Promise.all([
    fetchAPI(`/articles?_sort=id:desc&_locale=${context.locale}`),
    fetchAPI(`/projects?_sort=id:desc&_locale=${context.locale}`),
    fetchAPI(`/homepage?_locale=${context.locale}`),
    fetchAPI(`/global?_locale=${context.locale}`),
  ]);

  return {
    props: {
      articles, projects, homepage, global,
    },
  };
}
