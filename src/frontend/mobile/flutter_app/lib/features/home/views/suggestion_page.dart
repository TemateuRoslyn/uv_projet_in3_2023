import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/common/widgets/fields.dart';
import 'package:fltter_app/common/widgets/modals_and_animated_dialogs.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../common/utils/constants.dart';
import '../logic/home_cubit.dart';

class Suggestions extends StatelessWidget {
  const Suggestions({super.key});

  // bool decsriptionTap = false;
  // bool subjectDescription = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appColors.primary,
      body: SingleChildScrollView(
          child: Container(
        margin: const EdgeInsets.all(30),
        child: Column(
          // mainAxisAlignment: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
          children: [
            const SizedBox(
              height: 50,
            ),
            Center(
              child: Image.asset(
                AppImages.suggestionBox,
                height: getHeight(200, context),
                width: getWidth(200, context),
              ),
            ),
            Container(
              margin: EdgeInsets.only(
                top: getHeight(20, context),
                bottom: getHeight(30, context),
              ),
              child: Text(
                "Suggestion Box",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                  color: appColors.white!,
                ),
              ),
            ),
            Fields(
              fieldType: 'descriptionInput',
              labelText: 'Description :',
              controller: context.read<HomeCubit>().suggestion,
              hintText: 'Entrez votre suggestion ...',
            ),
            SizedBox(
              height: getHeight(20, context),
            ),
            CommonWidgets.commonButton(
              press: () {
                final suggestionText =
                    context.read<HomeCubit>().suggestion.text.trim();
                if (suggestionText.isEmpty) {
                  Modals.showScaffoldMessenger(
                    context: context,
                    content: 'Veuillez remplir le champ ci-dessus.',
                    type: 'error',
                  );
                } else {
                  // context.read<HomeCubit>().insertSuggestion();
                }
              },
              text: 'Envoyer',
              color: appColors.secondary!,
              roundedBorders: true,
              context: context,
            ),
          ],
        ),
      )),
    );
  }
}
