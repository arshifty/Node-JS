const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM student', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO student set ?', data, (err, customer) => {
            console.log(customer);
            res.redirect('/');
        })
    })
};


controller.semester = (req, res) => {
	
	 const data = req.body;
	 
	  console.log(req.body);
	 console.log(data);
	 
	  console.log(data.semester);
	  
	    const semsdata = data.semester;
	 console.log("semester data "+semsdata);
	
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE semester = ?", [semsdata], (err, rows) => {
            res.render('semestercustomer', {
                data: rows
            })
        });
    });

};

controller.search = (req, res) => {
	
	 const data = req.body;
	 
	  console.log(req.body);
	 console.log(data);
	 
	  console.log(data.roll);
	  
	    const rolldata = data.roll;
	 console.log("roll data "+rolldata);
	
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE roll = ?", [rolldata], (err, rows) => {
            res.render('searchcustomer', {
                data: rows
            })
        });
    });

};


controller.edit = (req, res) => {
    const {id} = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    });
};




controller.update = (req, res) => {
    const {id} = req.params;
    const newCustomer = req.body;
	
	 console.log(req.body);
	
    req.getConnection((err, conn) => {

        conn.query('UPDATE student set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const {id} = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM student WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
