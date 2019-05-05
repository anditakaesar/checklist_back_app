const express = require('express');
const router = express.Router();
const CheckList = require('../models/list');

router.get('/',
    (req, res) => {        
        CheckList.find({}).sort({ date: -1 }).exec((err, checklists) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err: err
                });
            }

            return res.status(200).json({
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
        
        if (!id) {
            return res.status(200).json({
                success: false,
                msg: 'id is null'
            });
        }
        else if (!desc){
            return res.status(200).json({
                success: false,
                msg: 'description is null'
            });
        }
        else if (chkd === undefined) {
            return res.status(200).json({
                success: false,
                msg: 'checked is null'
            });
        }

        CheckList.findOneAndUpdate(
            { '_id': id }, 
            { description: desc, checked: chkd }, 
            { new: true }, 
            (err, checklist) => {
                if (err) {
                    return res.status(404).json({ 
                        success: false, 
                        msg:'couldn\'t retrieve checklist due to error', 
                        err: err 
                    });
                }

                if (!checklist) {
                    return res.status(404).json({
                        success: false,
                        msg: 'checklist not found'
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        msg: 'checklist updated',
                        checklist: checklist
                    });
                }
            }
        );
    }
);

router.get('/:id',
    (req, res) => {
        res.status(200);
        CheckList.findOne({ '_id': req.params.id }, (err, checklist) => {
            if (err) {
                return res.status(400).json({ 
                    success: false, 
                    msg:'couldn\'t retrieve checklist due to error', 
                    err: err 
                });
            }

            if (checklist && checklist.length == 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'checklist not found'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    msg: 'check retrieved checklist',
                    checklist: checklist
                });
            }
        });
    }
);

router.put('/',
    (req, res) => {
        res.status(200);
        var newList = new CheckList({ description: req.body.description });
        newList.save().then(() => {
            //console.log('an item saved');
            return res.status(200).json({
                success: true,
                list: newList
            });
        });
    }
);

router.delete('/',
    (req, res) => {
        return res.status(200).json({
            success: true,
            msg: 'delete list success UNIMPLEMENTED'
        });
    }
);

module.exports = router;