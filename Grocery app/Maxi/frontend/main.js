const login = () => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password })
    };
    fetch('http://localhost:5001/api/auth', opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        console.log(body);
        sessionStorage.setItem('token', body.token)
        window.location.replace("/grocery.html");
    });
}

const register = () => {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    };
    fetch('http://localhost:5001/api/users', opts).then(function (body) {
        alert("success!");
        window.location.replace("/login.html");
    });
}

const addGrocery = () => {
    var name = document.getElementById('newGroceryName').value;
    var quantity = document.getElementById('newGroceryQuantity').value;
    var rate = document.getElementById('newGroceryRate').value;

    var opts = {
        method: 'POST',
        headers: {
            'x-auth-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, quantity: quantity, rate: rate })
    };
    fetch('http://localhost:5001/api/groceries', opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        alert("success!");
        document.getElementById('btnAddNewGroceryCancel').click();
        readGrocery();
    });
}

const updateGrocery = () => {
    var name = document.getElementById('editGroceryName').value;
    var quantity = document.getElementById('editGroceryQuantity').value;
    var rate = document.getElementById('editGroceryRate').value;
    var id = sessionStorage.getItem('item');

    var opts = {
        method: 'PUT',
        headers: {
            'x-auth-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, name: name, quantity: quantity, rate: rate })
    };
    fetch('http://localhost:5001/api/groceries', opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        alert("success!");
        document.getElementById('btnEditGroceryCancel').click();
        readGrocery();
    });
}

const deleteGrocery = () => {
    var id = sessionStorage.getItem('item');

    var opts = {
        method: 'DELETE',
        headers: {
            'x-auth-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    };
    fetch('http://localhost:5001/api/groceries', opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        alert("success!");
        document.getElementById('btnDeleteGroceryCancel').click();
        readGrocery();
    });
}

const readGrocery = () => {
    var token = sessionStorage.getItem('token');
    if (token == null) {
        window.location.replace("/login.html");
        return;
    }

    var opts = {
        method: 'GET',
        headers: {
            'x-auth-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:5001/api/groceries', opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        console.log(body);
        var old_tbody = document.getElementById('groceryTableBody');
        var new_tbody = document.createElement('tbody');
        new_tbody.id = 'groceryTableBody';
        body.map((grocery, idx) => {
            var trow = document.createElement('tr');
            trow.id = idx;
            var colName = document.createElement('td');
            var colQuantity = document.createElement('td');
            var colRate = document.createElement('td');
            var colActions = document.createElement('td');
            colName.innerHTML = grocery['name'];
            colQuantity.innerHTML = grocery['quantity'];
            colRate.innerHTML = grocery['rate'];
            var editModalAnchor = document.createElement("a");
            var deleteModalAnchor = document.createElement("a");
            editModalAnchor.onclick = openEditModal;
            deleteModalAnchor.onclick = openDeleteModal;
            editModalAnchor.id = grocery['_id'];
            deleteModalAnchor.id = grocery['_id'];
            editModalAnchor.innerHTML = '<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>'
            deleteModalAnchor.innerHTML = '<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>'
            colActions.appendChild(editModalAnchor);
            colActions.appendChild(deleteModalAnchor);
            // colActions.innerHTML = `
            // <a id=${grocery['_id']} href="#deleteGroceryModal" class="delete" data-toggle="modal"><i
            //     class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>`;
            trow.appendChild(colName);
            trow.appendChild(colQuantity);
            trow.appendChild(colRate);
            trow.appendChild(colActions);
            new_tbody.appendChild(trow);
        });
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
    });
}

const openEditModal = (e) => {
    sessionStorage.setItem('item', e.target.parentElement.id);
    var opts = {
        method: 'GET',
        headers: {
            'x-auth-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:5001/api/groceries/' + e.target.parentElement.id, opts).then(function (response) {
        return response.json();
    }).then(function (body) {
        var anchor = document.createElement("a");
        anchor.id = e.target.parentElement.id;
        anchor.className = "edit";
        anchor.href = "#editGroceryModal";
        anchor.setAttribute("data-toggle", "modal");
        document.getElementById('groceryTableBody').appendChild(anchor);
        $(".edit")[0].click();
        document.getElementById('editGroceryName').value = body.name;
        document.getElementById('editGroceryQuantity').value = body.quantity;
        document.getElementById('editGroceryRate').value = body.rate;
    });
}

const openDeleteModal = (e) => {
    sessionStorage.setItem('item', e.target.parentElement.id);
    var anchor = document.createElement("a");
    anchor.id = e.target.parentElement.id;
    anchor.className = "delete";
    anchor.href = "#deleteGroceryModal";
    anchor.setAttribute("data-toggle", "modal");
    document.getElementById('groceryTableBody').appendChild(anchor);
    $(".delete")[0].click();
}