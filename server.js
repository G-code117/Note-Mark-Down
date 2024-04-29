const express = require('express');
const app = express();
const PORT = process.env.PORT || 3201;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get(`/api/notes`,(req,res) =>{
    
});
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
} );