import './App.css';
import { useStates } from 'react-easier';

export default function App() {

  const s = useStates({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  function submitForm(event) {
    event.preventDefault();
    let toPost = { ...s };
    delete toPost.repeatPassword;
    alert('SUBMIT:\n' + JSON.stringify(toPost, null, '  '));
  }

  function check() {
    for (let el of document.forms?.register || []) {
      console.log(el)
      let value = el.value;
      // Reset custom validity to valid
      el.setCustomValidity('');
      // Special checks
      if (el.name === 'password') {
        if (value.toLowerCase() === value || value.toUpperCase() === value || !/\d/.test(value)) {
          el.setCustomValidity('Lösenordet måste vara 8 tecken långt och innehålla både stora och små bokstäver, samt minst en siffra!');
        }
      }
      if (el.name === 'repeatPassword') {
        if (value !== s.password) {
          el.setCustomValidity('Här måste du fylla i samma lösenord en gång till! Just nu skiljer de sig åt!');
        }
      }
    }
  }
  check();

  return <div className="container mt-5">
    {/** Note: The React Easier bind command sets the name of the field to the name of the property! */}
    {/** If you don't want to use React Easier - that's fine - then set the name attribute manually */}
    <div className="row">
      <div className="col">
        <form name="register" onSubmit={submitForm}>
          <label className="form-label">
            <input type="text" className="form-control" required placeholder="Förnamn" {...s.bind('firstName')} />
          </label>
          <label className="form-label">
            <input type="text" className="form-control" required placeholder="Efternamn" {...s.bind('lastName')} />
          </label>
          <label className="form-label">
            <input type="email" className="form-control" required placeholder="E-post" {...s.bind('email')} />
          </label>
          <label className="form-label">
            <input type="password" className="form-control" required minLength="8" placeholder="Lösenord" {...s.bind('password')} />
          </label>
          <label className="form-label">
            <input type="password" className="form-control" required placeholder="Upprepa lösenord" {...s.bind('repeatPassword')} />
          </label>
          <input className="btn btn-primary float-end mt-3" type="submit" value="Bli medlem" />
        </form>
      </div>
    </div>
  </div>
}

