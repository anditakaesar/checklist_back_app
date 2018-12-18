const express = require('express');
const app = express();

// mongoose
require('./utils/dbconn');
var CheckList = require('./models/list');

// bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// compression
var compression = require('compression');
app.use(compression());

// helmet
var helmet = require('helmet');
app.use(helmet());

// static files
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', 
    (req, res) => {
        return res.send('Default route');
    }
);

// routes '/list'
app.get('/list',
    (req, res) => {        
        CheckList.find({}).sort({ date: -1 }).exec((err, checklists) => {
            return res.json({
                success: true,
                checklist: checklists
            });
        });
    }
);

app.post('/list',
    (req, res) => {
        let id = req.body.id;
        let desc = req.body.description;
        let chkd = req.body.checked;
        if (!id) return res.json({
            success: false,
            msg: 'id is null'
        });
        else if (!desc) return res.json({
            success: false,
            msg: 'description is null'
        });
        else if (chkd === undefined) return res.json({
            success: false,
            msg: 'checked is null'
        });

        CheckList.findOneAndUpdate(
            { '_id': id }, 
            { description: desc, checked: chkd }, 
            { new: true }, 
            (err, checklist) => {
                if (err) {
                    return res.json({ 
                        success: false, 
                        msg:'couldn\'t retrieve checklist due to error', 
                        err: err 
                    });
                }

                if (!checklist) return res.json({
                    success: false,
                    msg: 'checklist not found'
                });
                else return res.json({
                    success: true,
                    msg: 'checklist updated',
                    checklist: checklist
                });
            });
    }
);

app.get('/list/:id',
    (req, res) => {
        CheckList.findOne({ '_id': req.params.id }, (err, checklist) => {
            if (err) return res.json({ 
                success: false, 
                msg:'couldn\'t retrieve checklist due to error', 
                err: err 
            });
            
            if (checklist && checklist.length == 0) return res.json({
                success: false,
                msg: 'checklist not found'
            });
            else return res.json({
                success: true,
                msg: 'check retrieved checklist',
                checklist: checklist
            });
        });
    }
);

app.put('/list',
    (req, res) => {
        var newList = new CheckList({ description: req.body.description });
        newList.save().then(() => {
            console.log('an item saved');
            return res.json({
                success: true,
                list: newList
            });
        });
    }
);

app.delete('/list',
    (req, res) => res.send('Delete a list')
);

// end routes '/list' 
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
