const { connect, connection } = require('mongoose');

const mongooseConnect = async (uri) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    };

    try {
        connect(uri, options);

        connection.once('open', () => {
            console.log('MongoDB connection successfully open!');

            connection.on('error', (error) => {
                console.log(`MongoDB Error: ${error}`);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = mongooseConnect;