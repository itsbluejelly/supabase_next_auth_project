export default function Login(){
    return (
        <form 
            action="/auth/signup"
            method="post"
        >
            <label htmlFor="email">Email</label>
            
            <input 
                type="text" 
                name="email" 
                id="email" 
            />

            <label htmlFor="email">Password</label>
            
            <input 
                type="text" 
                name="password" 
                id="password" 
            />

            <button>Sign in</button>
        </form>
    )
}