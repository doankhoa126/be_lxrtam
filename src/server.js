import app from './app.js';


const PORT = process.env.PORT || 5924;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
