import SignupForm from "../components/Auth/SignupForm";
import PastConcerts from "../components/Home/PastConcerts";
// use a form to Submit data to bd  with axios.post
// this sends data  through the post request of auth.routes it will be  in req.body
//
// how the backend responds ? : It sees if the user exists with ( findOne) else it hashes the password and
// it creates a user in mongodb and returns: if signup: ( user: {_id:, email, name} ) if login:  token to the front
// we should then save the token in a storage but how ?

function Signup() {

    return (
        <>

            <SignupForm />

        </>
    )
}

export default Signup;