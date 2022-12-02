
function About() {
    return(
        <div className="backgroundColor2 textCtr">
        <h1 className="textColor">Welcome to Neighbourly</h1>
        <h2 className="textColor">A friendly space to lend, borrow and interact with your neighbours</h2>
        <p className="Info">Ever needed to change a lighbulb and felt a ladder might be better than standing tiptoe on a chair? Or maybe you need to tighten those chair legs, but a spanner is not in your personal toolbox. Neighbourly allows you to connect with neighbours and people in your community.</p>
        <p className="Info">
        As co-founders of Neighbourly, we asked ourselves, who really wants to buy a lawnmower for that one instance that you spontaneously decide to become a gardening fanatic? What better solution than to rely on the kindness of strangers or, in this case, your very own neighbours!
      </p>
        <p className="Info">
        Using your Neighbourly account you can check out all the odd bits and bobs that are up for grabs, as well as put your own up for lending.
      </p>
      <div className="InfoBox">
<a className="PersonBox" target="_blank" href="https://github.com/lutrx">
    <img className="InfoImg" src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669904023/Project%203%20-%20Neighbourly/Lisa_z1ldrd.jpg"/>
    <h3 className="PersonName">Lisa-Maria Bieker</h3>
    </a>
<a className="PersonBox" target="_blank" href="https://github.com/POrwell">
    <img className="InfoImg" src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669904031/Project%203%20-%20Neighbourly/Phoebe_xtj1fr.jpg"/>
    <h3 className="PersonName">Phoebe Orwell</h3>
</a>
<a className="PersonBox" target="_blank" href="https://github.com/kohoki">
    <img className="InfoImg" src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669904027/Project%203%20-%20Neighbourly/Ralf_bdujyw.jpg"/>
    <h3 className="PersonName">Ralf Bonnick</h3>
</a>
      </div>
        </div>
    )
}

export default About;