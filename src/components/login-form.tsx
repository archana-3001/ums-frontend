
export default function LoginForm() {
    return (
        <>
         <div id="login-form">
  <h2 className="header">Login</h2>
  <div>
    <form>
      <input type="text" name="Username" placeholder="Username"></input>
      <input type="Password" name="Password" placeholder="Password"></input>
      <button type="submit">Login</button>
    </form>
  </div>
</div>
        </>
    );
}