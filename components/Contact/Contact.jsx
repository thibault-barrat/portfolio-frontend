import PropTypes from 'prop-types';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Obfuscate from 'react-obfuscate';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import styles from './Contact.module.scss';

export default function Contact({
  nameValue,
  emailValue,
  subjectValue,
  messageValue,
  checkRequiredField,
  checkEmail,
  nameError,
  emailError,
  mailRegexError,
  subjectError,
  messageError,
  onChange,
  onSubmit,
  isSpam,
  isSuccess,
  isError,
  isLoading,
}) {
  return (
    <div className={styles.contact}>
      <div className={styles.details}>
        {/* Library react-obfuscate to obfuscate mailto, tel and whatsapp link to robots : https://github.com/coston/react-obfuscate */}
        <div className={styles['details-row']}>
          <Obfuscate style={{ display: 'inline-block' }} className={styles['icon-link']} tel="+33678551725">
            <FaPhone className={styles.icon} />
          </Obfuscate>
          <Obfuscate style={{ display: 'inline-block' }} className={styles.link} tel="+33678551725" />
        </div>
        <div className={styles['details-row']}>
          <Obfuscate style={{ display: 'inline-block' }} className={styles['icon-link']} email="contact@thibault-barrat.com">
            <MdMail className={styles.icon} />
          </Obfuscate>
          <Obfuscate style={{ display: 'inline-block' }} className={styles.link} email="contact@thibault-barrat.com" />
        </div>
        <div className={styles['details-row']}>
          <Obfuscate style={{ display: 'inline-block' }} className={styles['icon-link']} href="https://wa.me/33678551725" target="_blank" rel="noreferrer">
            <FaWhatsapp className={styles.icon} />
          </Obfuscate>
          <Obfuscate style={{ display: 'inline-block' }} className={styles.link} href="https://wa.me/33678551725" target="_blank" rel="noreferrer">
            Discutons sur WhatsApp
          </Obfuscate>
        </div>
      </div>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={`${styles['field-container']} ${nameError ? styles['field-container--message'] : ''}`}>
          {nameError && <p className={`${styles.message} ${styles.error}`}>Le champ ci-dessous est requis</p>}
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Votre nom"
            value={nameValue}
            onChange={onChange}
            onBlur={() => checkRequiredField('name')}
          />
        </div>
        <div className={`${styles['field-container']} ${emailError || mailRegexError ? styles['field-container--message'] : ''}`}>
          {emailError && <p className={`${styles.message} ${styles.error}`}>Le champ ci-dessous est requis</p>}
          {mailRegexError && <p className={`${styles.message} ${styles.error}`}>Ce champ doit être un email valide</p>}
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Votre email"
            value={emailValue}
            onChange={onChange}
            onBlur={() => {
              checkRequiredField('email');
              checkEmail();
            }}
          />
        </div>
        <div className={`${styles['field-container']} ${subjectError ? styles['field-container--message'] : ''}`}>
          {subjectError && <p className={`${styles.message} ${styles.error}`}>Le champ ci-dessous est requis</p>}
          <input
            className={styles.input}
            name="subject"
            type="text"
            placeholder="L'objet de votre message"
            value={subjectValue}
            onChange={onChange}
            onBlur={() => checkRequiredField('subject')}
          />
        </div>
        <div className={`${styles['field-container']} ${messageError ? styles['field-container--message'] : ''}`}>
          {messageError && <p className={`${styles.message} ${styles.error}`}>Le champ ci-dessous est requis</p>}
          <textarea
            className={`${styles.input} ${styles['input--textarea']}`}
            name="message"
            type="text"
            placeholder="Votre message"
            value={messageValue}
            onChange={onChange}
            onBlur={() => checkRequiredField('message')}
          />
        </div>
        <div className={`${styles['field-container']} ${isError || isSpam || isSuccess ? styles['field-container--message'] : ''}`}>
          {isError && <p className={`${styles.message} ${styles.error}`}>Une erreur est survenue, veuillez réessayer</p>}
          {isSpam && <p className={`${styles.message} ${styles.error}`}>Votre message a été détecté comme spam</p>}
          {isSuccess && <p className={`${styles.message} ${styles.success}`}>Votre message a bien été envoyé</p>}
          {isLoading && <Spinner size={54} />}
          {!isLoading && (
            <Button
              type="submit"
              text="Envoyer"
            />
          )}
        </div>
      </form>
    </div>
  );
}

Contact.propTypes = {
  nameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  subjectValue: PropTypes.string.isRequired,
  messageValue: PropTypes.string.isRequired,
  checkRequiredField: PropTypes.func.isRequired,
  checkEmail: PropTypes.func.isRequired,
  nameError: PropTypes.bool.isRequired,
  emailError: PropTypes.bool.isRequired,
  mailRegexError: PropTypes.bool.isRequired,
  subjectError: PropTypes.bool.isRequired,
  messageError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSpam: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
