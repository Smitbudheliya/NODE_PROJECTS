const http = require('http');

const port = 7001;
const fs = require('fs');

const requestHandle = (req,res ) => {
    let filename = "";
    switch(req.url) {
        case '/':
            filename = 'home.html';
            break;
        case '/about':
            filename = 'about.html';
            break;
        case '/contact':
            filename = 'contact.html';
            break;
        case '/blog':
            filename = 'blog.html';
            break;
        case '/product':
            filename = 'product.html';
            break;
        default:
            filename = '404.html';
            break;
    }

    fs.readFile(filename,(err,data) => {
        if(err) {
            console.log(err);
            return false;
        }
        res.write(data);
        res.end();
    })

}


const server = http.createServer(requestHandle)

server.listen(port,(err) => {
    if(err) {
        console.log(err);
        return false;
        
    }
    console.log(`server running on port ${port}`);
    

})