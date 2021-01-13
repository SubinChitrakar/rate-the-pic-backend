export default function (req, res, next) {
    if(req.session.page_view == 1){
        res.redirect('/');
        return
    }
    next();
}