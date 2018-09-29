module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("I'm on the '/' page.");
    });
    app.get("/route", (req, res)=>{
        res.send("I'm on the '/route' page.");
    });
    app.get("*", (req, res)=>{
        res.send("Where am I?");
    });
}