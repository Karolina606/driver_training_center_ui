import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, TextField, Box } from '@mui/material';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
'& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
'& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log({username})
    console.log({password})
    console.log({password2})
    registerUser(username, password, password2);
  };

  
  const classes = useStyles();
    // create state variables for each input
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
  
    // const handleSubmit = e => {
    //   e.preventDefault();
    //   console.log(firstName, lastName, email, password);
    //   // handleClose();
    // };
  return (
    <section>
      <Box sx={{px:"1rem"}}>
      <h1>Zarejestruj się</h1>
      {/* <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        <button>Register</button>
      </form> */}
      {/* <FormGroup onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
      </FormGroup> */}
      <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Nazwa użytkownika"
        variant="outlined"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        label="Imie"
        variant="outlined"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Nazwisko"
        variant="outlined"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Hasło"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <TextField
        label="Powtórz hasło"
        variant="outlined"
        type="password"
        required
        value={password2}
        onChange={e => setPassword2(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained">
          Zarejestruj
        </Button>
      </div>
    </form>
    </Box>
    </section>
  );
};

export default Register;