var express = require('express');
var router = express.Router();
var CheckList = require('../models/list');

// a router for /list

router.get('/',
    (req, res) => {        
        CheckList.find({}).sort({ date: -1 }).exec((err, checklists) => {
            res.status(200);
            return res.json({
                success: true,
                checklist: checklists
            });
        });
    }
);

router.post('/',
    (req, res) => {
        let id = req.body.id;
        let desc = req.body.description;
        let chkd = req.body.checked;
        res.status(200);
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

router.get('/:id',
    (req, res) => {
        res.status(200);
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

router.put('/',
    (req, res) => {
        res.status(200);
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

router.delete('/',
    (req, res) => {
        res.status(200);
        res.send('Delete a list');
    }
);

module.exports = router;