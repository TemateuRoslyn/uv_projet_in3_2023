import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1f1a30),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0),
          child: Column(
            children: [
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(top: 5),
                  child: Image.asset(
                    'assets/images/Login_image.jpg',
                    height: getHeight(250, context),
                    width: getWidth(250, context),
                  ),
                ),
              ),
              SizedBox(
                height: getHeight(20, context),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Container(
                  margin: const EdgeInsets.only(left: 1.0, top: 0, bottom: 0),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    'Se Connecter',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      color: Color.fromRGBO(255, 255, 255, 1),
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 5, left: 10),
                child: Container(
                  margin: const EdgeInsets.only(left: 1.0),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    'Veuillez entrez vos informatons',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              // Espace avant les textFormFields
              SizedBox(
                height: getHeight(40.0, context),
              ),
              Container(
                padding: const EdgeInsets.only(
                  top: 5.0,
                  left: 20.0,
                ),
                child: const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Adresse email ou username :',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 10.0),
                child: TextFormField(
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                  ),
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: const Color(0xFF585368),
                    focusColor: const Color(0xFF585368),
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                      borderSide: const BorderSide(color: Color(0xFF585368)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Color(0xFF585368),
                      ),
                      borderRadius: BorderRadius.circular(40),
                    ),
                    // labelText: 'Email Address',
                    // labelStyle: const TextStyle(color: Colors.white),
                    hintText: 'user123@email.com',
                    prefixIcon: const Icon(
                      Icons.mail,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              // Espace entre les deux textFormField
              SizedBox(
                height: getHeight(2.0, context),
              ),
              Container(
                padding: const EdgeInsets.only(
                  top: 5.0,
                  left: 20.0,
                ),
                child: const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Mot de passe :',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 10.0),
                child: TextFormField(
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                  ),
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: const Color(0xFF585368),
                    focusColor: const Color(0xFF585368),
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(40),
                      borderSide: const BorderSide(color: Color(0xFF585368)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Color(0xFF585368),
                      ),
                      borderRadius: BorderRadius.circular(40),
                    ),
                    hintText: 'Password ...',
                    prefixIcon: const Icon(
                      Icons.lock,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              // espace avant le button LOGIN...
              SizedBox(
                height: getHeight(60.0, context),
              ),
              ElevatedButton(
                onPressed: (() {}),
                style: ElevatedButton.styleFrom(
                  primary: const Color(0xFF77f6e4),
                  onPrimary: Colors.black,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  minimumSize:
                      Size(getHeight(265, context), getWidth(60, context)),
                ),
                child: const Text('LOGIN'),
              ),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 15.0),
                child: Center(
                  child: TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Mot de passe oublié ?',
                      style: TextStyle(color: Color(0xFF77f6e4)),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
