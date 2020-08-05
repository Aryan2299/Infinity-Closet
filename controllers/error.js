exports.pageNotFoundError = (req,res,next) => {
    res.render("404Error", {
        pageTitle: "Page Not Found",
        path: null
    })
}