import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/common/widgets/fields.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class Suggestion extends StatelessWidget {
  // const Suggestion({super.key});
  bool decsriptionTap = false;
  bool subjectDescription = false;

  Suggestion({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
          child: Container(
        margin: const EdgeInsets.all(30),
        child: Column(
          // mainAxisAlignment: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
          children: [
            const SizedBox(
              height: 50,
            ),
            Container(
              child: const Text("Images container"),
            ),
            Container(
              margin: EdgeInsets.only(
                  top: getHeight(20, context), bottom: getHeight(30, context)),
              child: const Text(
                "Suggestion Box",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                  color: Colors.orange,
                ),
              ),
            ),
            Fields(
              fieldType: 'descriptionInput',
              labelText: 'Sujet de la suggestion :',
              hintText: "Entrez le sujet de la suggestion ...",
            ),
            SizedBox(
              height: getHeight(20, context),
            ),
            Fields(
              fieldType: 'descriptionInput',
              labelText: 'Description :',
              hintText: "Entrez la description ...",
            ),
            SizedBox(
              height: getHeight(40, context),
            ),
            CommonWidgets.commonButton(
              press: () {},
              text: 'Envoyer',
              color: appColors.ligthGreen!,
              roundedBorders: true,
              context: context,
            ),
          ],
        ),
      )),
    );
  }
}
