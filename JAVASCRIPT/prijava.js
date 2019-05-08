
/////////////////////////////////////////////////////////////////////////
var closebtns = document.getElementsByClassName("btnFlipClose");
var i;

for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function () {
        window.location.replace("studentskaSluzba.html#login");
    });
}
////////////////////////////////////////////////
portal = () => {

    document.getElementById("nalog").style.display = 'grid';
    window.location.replace("#nalog");
    document.getElementById("flipIspit").style.display = 'none';


    // document.getElementsByTagName("a")[2].setAttribute("href", "#modal");
}
////////////////////////////////////////////////////////////////

document.getElementById("btnRegister").addEventListener("click", signup);

function signup(event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const username = document.getElementById("username").value;
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;



    if (firstname == '') {
        document.getElementById('infoSF').innerHTML = 'Morate da unesete Vase ime!';
        return;
    }

    if (lastname == '') {
        document.getElementById('infoSF').innerHTML = 'Morate da unesete Vase prezime!';
        return;
    }
    if (!username.match(/(^\d{1,5})([/]{1})(\d{2}$)/)) {
        document.getElementById('infoSF').innerHTML = 'Morate da unesete broj indeksa u formi 12345/12!';
        return;
    }
    if (username.match(/(^[0]{1,5})([/]{1})([0]{2}$)/)) {
        document.getElementById('infoSF').innerHTML = 'Morate da unesete broj indeksa koji nije jednak nuli!';
        return;
    }

    if (!pass) {
        document.getElementById('infoSF').innerHTML = 'Morate da unesete lozinku!';
        return;
    }

    if (pass !== pass2) {
        document.getElementById('infoSF').innerHTML = 'Vase lozinke nisu iste!';
        return;
    }
    save(firstname, lastname, username, pass);

}

function save(firstname, lastname, username, pass) {

    let users = [];
    const newUser = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        pass: pass

    };

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));

        if (!users.find(user => user.username === newUser.username)) {
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            document.getElementById('infoSF').innerHTML = 'Uspesno ste se registrovali,predjite na Login formu!';

        } else {
            document.getElementById('infoSF').innerHTML = `Student ${username} vec postoji u registru!`;
        }
    } else { // Ovo se izvrsava samo prvi put
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById('infoSF').innerHTML = `Uspesno ste se registrovali,predjite na Login formu!`;

    }
}
//////////////////////////////////////////////////////////////////
document.getElementById("loginL").addEventListener("click", login);

function login(event) {
    event.preventDefault();

    const username = document.getElementById("usernameL").value;
    const pass = document.getElementById("passL").value;

    const users = JSON.parse(localStorage.getItem("users"));

    let registeredUser;
    if (users) {
        registeredUser = users.find(user => user.username === username && user.pass === pass);
    } else {
        registeredUser = null;
    }

    if (registeredUser) { // ovo je uspesan login
        const firstname = registeredUser.firstname;
        const lastname = registeredUser.lastname;

        document.getElementById("infoLF").innerHTML = `Student ${firstname} ${lastname} je uspesno ulogovan`;

        users.forEach(user => {
            document.getElementById("imeStudenta").innerHTML = `${user.firstname}`;
            document.getElementById("prezimeStudenta").innerHTML = `${user.lastname}`;
            document.getElementById("indexStudenta").innerHTML = `${user.username}`;

        });
    } else {
        document.getElementById("infoLF").innerHTML = `Uneti su pogresni podaci!`;
    }
}
////////////////////////////////////////////////////////////77
$(document).ready(function () {
    $(".btnFlipClose").hover(function () {
        $(this).text("LOG OUT").css("font-size", "2.2vw");
    }, function () {
        $(this).text("x").css("font-size", "3.5vw");
    });

    //////////////////////////////////////
    $("#chButton").click(function (e) {
        event.preventDefault();
        var text = '';
        $(".isp:checked").each(function () {
            text += $(this).val() + ' ';
        });
        text = text.substring(0, text.length - 1);
        $("#prijavaIspita").val(text);
        ////////////////////////////////////////
        let x = $("#prijavaIspita").val();

        let y = x.split(' ');
        /* console.log(Array.isArray(x));
        console.log(x);
        console.log(Array.isArray(z)); */
        //console.log("y" + y);
        //console.log(typeof (y));
        let z = y.toString();
        //console.log("z" + z);
        //console.log(typeof (z));
        $('#sta').text("Vasi prijavljeni ispiti:  "); //+ z);

        /////////////////////////////////////////////
        let users = [];

        const firstname = $("#imeStudenta").text();
        const lastname = $("#prezimeStudenta").text();
        const username = $("#usernameL").val();
        const pass = $("#passL").val();
        let ispiti = z;
        const newUser = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            pass: pass,
            ispiti: ispiti
        };

        if (username == '') {
            return;
        }
        if (pass == '') {
            return;
        }

        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));


            if (users.find(user => user.username === newUser.username)) {
                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
                $("#saLS").text(ispiti);
            }
        } else {
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            $("#saLS").text(ispiti);

        }

        //console.log(username);
        //console.log(ispiti);

    });

});