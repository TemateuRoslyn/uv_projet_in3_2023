import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../common/models/user.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool profileIsSelected = true;
  bool modifyProfileIsSelected = false;
  late User _currentUser;
  late ProfileCubit _profileCubit;

  @override
  void initState() {
    super.initState();

    _profileCubit = context.read<ProfileCubit>();
    _currentUser = _profileCubit.state.currentUser!;
  }

  @override
  Widget build(BuildContext context) {
    final List<ProfileOption> profileOptions = [
      ProfileOption(
        icon: Icons.person,
        backgroundColor: profileIsSelected ? appColors.primary! : Colors.white,
        iconColor: profileIsSelected ? Colors.white : Colors.grey,
        text: 'Profile',
        action: () {
          setState(() {
            profileIsSelected = !profileIsSelected;
            modifyProfileIsSelected = !modifyProfileIsSelected;
          });
        },
      ),
      ProfileOption(
        icon: Icons.exit_to_app,
        backgroundColor: appColors.secondary!,
        iconColor: Colors.white,
        text: 'Deconnexion',
        action: () {},
      ),
      ProfileOption(
        icon: Icons.edit,
        backgroundColor:
            modifyProfileIsSelected ? appColors.primary! : Colors.white,
        iconColor: modifyProfileIsSelected ? Colors.white : Colors.grey,
        text: 'M.Profile',
        action: () {
          setState(() {
            modifyProfileIsSelected = !modifyProfileIsSelected;
            profileIsSelected = !profileIsSelected;
          });
        },
      ),
    ];

    final List profileTiles = [
      {
        'text': 'Mes Fautes',
        'icon': Icons.arrow_forward_ios_rounded,
      },
      {
        'text': 'Mes Sanctions',
        'icon': Icons.arrow_forward_ios_rounded,
      },
      {
        'text': 'Changer mon mot de passe',
        'icon': Icons.arrow_forward_ios_rounded,
      }
    ];

    final List colonnes = [
      {
        'text1': 'Hello...',
        'text2': '${_currentUser.firstName} ${_currentUser.lastName}',
        'isFirst': true,
      },
      {
        'text1': 'Faute(s)',
        'text2': '0',
        'isFirst': false,
      },
      {
        'text1': 'Sanction(s)',
        'text2': '0',
        'isFirst': false,
      }
    ];

    return Expanded(
      child: ListView(
        children: [
          Container(
            padding: EdgeInsets.only(
                top: getHeight(
                  20,
                  context,
                ),
                left: getWidth(10, context)),
            // height: getHeight(50, context),
            width: double.infinity,
            // color: Colors.amber,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Paramètres',
                  style: TextStyle(
                      fontSize: getHeight(20, context),
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                SizedBox(
                  height: getHeight(30, context),
                ),
                Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Image.asset(
                        AppImages.unknownPersonImg,
                        height: getHeight(60, context),
                        width: getWidth(60, context),
                        // color: Colors.white,
                      ),
                    ),
                    ...colonnes.map((colonne) => Colonne(
                        isFirst: colonne['isFirst'],
                        text1: colonne['text1'],
                        text2: colonne['text2'])),
                  ],
                )
              ],
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: getHeight(30, context)),
            padding: EdgeInsets.only(top: getHeight(30, context)),
            height: getHeight(600, context),
            width: double.infinity,
            decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40))),
            child: Column(
              children: [
                // profile options part
                Padding(
                  padding:
                      EdgeInsets.symmetric(horizontal: getWidth(65, context)),
                  child: Row(
                      children: profileOptions
                          .map((profileOption) => profileOption)
                          .toList()),
                ),
                SizedBox(
                  height: getHeight(20, context),
                ),
                const Divider(
                  thickness: 5,
                ),
                ...ListTile.divideTiles(
                        context: context,
                        color: Colors.grey,
                        tiles: profileTiles
                            .map((profileTile) => ProfileTile(
                                icon: profileTile['icon'],
                                text: profileTile['text']))
                            .toList())
                    .toList(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class Colonne extends StatelessWidget {
  const Colonne({
    super.key,
    required this.text1,
    required this.text2,
    required this.isFirst,
  });

  final String text1;
  final String text2;
  final bool isFirst;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: getWidth(10, context)),
      child: Column(
        crossAxisAlignment:
            isFirst ? CrossAxisAlignment.start : CrossAxisAlignment.center,
        children: [
          Text(
            text1,
            style: TextStyle(
                fontSize: getHeight(15, context),
                color: Colors.white.withOpacity(0.7)),
          ),
          SizedBox(
            height: getHeight(10, context),
          ),
          SizedBox(
            width: getWidth(isFirst ? 100 : 20, context),
            child: Text(
              text2,
              textAlign: isFirst ? null : TextAlign.center,
              style: TextStyle(
                  overflow: TextOverflow.ellipsis,
                  fontSize: getHeight(15, context),
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileTile extends StatelessWidget {
  const ProfileTile({
    super.key,
    required this.icon,
    required this.text,
  });

  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Text(
        text,
        style: TextStyle(
          fontSize: getHeight(11, context),
          color: Colors.black,
          // fontWeight: FontWeight.bold
        ),
      ),
      trailing: Icon(
        icon,
        size: getHeight(13, context),
        color: Colors.black,
      ),
    );
  }
}

class ProfileOption extends StatelessWidget {
  const ProfileOption(
      {super.key,
      required this.icon,
      required this.text,
      required this.backgroundColor,
      required this.iconColor,
      required this.action});

  final IconData icon;
  final String text;
  final Color backgroundColor;
  final Color iconColor;
  final void Function()? action;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: action,
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.symmetric(horizontal: getWidth(10, context)),
            height: getHeight(60, context),
            width: getWidth(60, context),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: backgroundColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    blurRadius: 2,
                    // offset: Offset(4, 8), // Shadow position
                  ),
                ]),
            child: Icon(
              icon,
              size: getHeight(30, context),
              color: iconColor,
            ),
          ),
          SizedBox(
            height: getHeight(10, context),
          ),
          Text(
            text,
            style: TextStyle(
                fontSize: getHeight(11, context),
                color: Colors.black,
                fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
