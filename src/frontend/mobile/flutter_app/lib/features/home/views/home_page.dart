import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/features/home/widgets/round_option.dart';
import 'package:fltter_app/features/profile/views/profile_page.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool profileIsSelected = true;
  bool modifyProfileIsSelected = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    children: [
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "DashBoard",
                      ),
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Boite a \n suggestion",
                      ),
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Status du\n paiement",
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Rapport de\n note",
                      ),
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Reglements \n interieurs",
                      ),
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Fautes",
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Reglements",
                      ),
                      RoundOption(
                        imagePath: AssetImage(AppImages.logo),
                        title: "Sanctions",
                      ),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
