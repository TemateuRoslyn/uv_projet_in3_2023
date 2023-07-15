import 'package:cached_network_image/cached_network_image.dart';
import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:flutter/material.dart';
import '../../features/home/logic/home_cubit.dart';
import '../styles/colors.dart';
import '../utils/helper.dart';
import 'fields.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CommonWidgets {
  static ElevatedButton commonButton({
    required Function()? press,
    required String text,
    required Color color,
    required BuildContext context,
    required bool roundedBorders,
  }) {
    return ElevatedButton(
      onPressed: press,
      style: ElevatedButton.styleFrom(
        shape: roundedBorders
            ? RoundedRectangleBorder(borderRadius: BorderRadius.circular(30))
            : null,
        minimumSize: Size(getWidth(200, context), getHeight(65, context)),
        maximumSize: Size(getWidth(200, context), getHeight(65, context)),
        backgroundColor: color,
      ),
      child: FittedBox(
        fit: BoxFit.scaleDown,
        child: Text(
          text,
          style: TextStyle(
            fontSize: getHeight(18, context),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  static Widget roundedNextButton({
    required void Function()? action,
    required double height,
    width,
    iconSize,
    required Color color,
    iconColor,
    required IconData? iconData,
  }) {
    return InkWell(
      onTap: action,
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
            color: color, borderRadius: BorderRadius.circular(30.0)),
        alignment: Alignment.center,
        child: Icon(iconData, size: iconSize, color: iconColor),
      ),
    );
  }

  static Widget noInternetWidget({
    required double positionFromTop,
    required BuildContext context,
    required Color color,
  }) {
    return Padding(
      padding: EdgeInsets.only(
          top: getHeight(positionFromTop, context),
          left: getWidth(50, context),
          right: getWidth(50, context)),
      child: Text(
        'Assurez vous d\'être connecté à internet...',
        textAlign: TextAlign.center,
        style: TextStyle(
            fontSize: getHeight(12, context),
            height: getHeight(1.5, context),
            color: color),
      ),
    );
  }

  static Widget circularProgressIndicatorWidget({
    required double positionFromTop,
    required BuildContext context,
    required Color color,
  }) {
    return Padding(
      padding: EdgeInsets.only(top: getHeight(positionFromTop, context)),
      child: Center(
        child: CircularProgressIndicator(
          strokeWidth: 2,
          color: color,
        ),
      ),
    );
  }

  static Widget failedStatusWidget({
    required double positionFromTop,
    required BuildContext context,
    required String statusMessage,
    required Color color,
    required void Function()? reloadFunction,
  }) {
    return Padding(
      padding: EdgeInsets.only(
          top: getHeight(positionFromTop, context),
          left: getWidth(50, context),
          right: getWidth(50, context)),
      child: Column(
        children: [
          Text(
            statusMessage,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: getHeight(15, context),
              fontWeight: FontWeight.bold,
              height: getHeight(1.5, context),
              color: color,
            ),
          ),
          TextButton(
            onPressed: reloadFunction,
            child: Text(
              'Recharger',
              textAlign: TextAlign.center,
              style: TextStyle(
                decoration: TextDecoration.underline,
                fontSize: getHeight(15, context),
                fontWeight: FontWeight.bold,
                color: appColors.secondary,
              ),
            ),
          )
        ],
      ),
    );
  }

  static Widget noDataWidget({
    required double positionFromTop,
    required BuildContext context,
    required Color color,
  }) {
    return Padding(
      padding: EdgeInsets.only(
          top: getHeight(positionFromTop, context),
          left: getWidth(50, context),
          right: getWidth(50, context)),
      child: Text(
        'Aucunes données trouvées pour le moment, veuillez réessayer plus tard...',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: getHeight(20, context),
          height: getHeight(1.5, context),
          color: color,
        ),
      ),
    );
  }

  static CachedNetworkImage renderImage(
      {required String imagePath, required BuildContext context}) {
    return CachedNetworkImage(
      // imageUrl: 'https://source.unsplash.com/random?sig=1/100x100',
      imageUrl:
          '${ApiConfiguration.appDomainUrl}api/files/download?filekey=$imagePath',
      height: getHeight(55, context),
      width: getWidth(55, context),
      fit: BoxFit.cover,
      placeholder: (_, __) => Container(
        color: Colors.grey[100],
      ),
      // imageBuilder: (_, imageProvider) => Container(
      //   decoration: BoxDecoration(
      //     image: DecorationImage(
      //       image: imageProvider,
      //       fit: BoxFit.cover,
      //     ),
      //   ),
      // ),
      errorWidget: (_, __, ___) => Center(
        child: Icon(
          Icons.image_not_supported_outlined,
          size: getHeight(35, context),
          color: appColors.ligthGreen,
        ),
      ),
    );
  }

  // static Widget renderImage(String imagePath) {
  //   return isUrlValid(imagePath)
  //       ? CircleAvatar(
  //           radius: 30,
  //           backgroundColor: appColors.primary,
  //           backgroundImage: CachedNetworkImageProvider(imagePath),
  //         )
  //       : const SizedBox();
  // }

  static Future<dynamic> suggestionBottomSheet(BuildContext context) {
    return showModalBottomSheet(
        isScrollControlled: true,
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
        context: context,
        builder: (context) => Padding(
              padding: EdgeInsets.only(
                right: getWidth(20, context),
                left: getWidth(20, context),
                top: getHeight(20, context),
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Quelque chose à suggerer ?',
                    style: TextStyle(
                      fontSize: getHeight(16, context),
                      fontWeight: FontWeight.bold,
                      color: appColors.black,
                    ),
                  ),
                  SizedBox(
                    height: getHeight(20, context),
                  ),
                  Fields(
                    simpleInputMaxlines: 10,
                    fieldType: 'simpleInput',
                    prefixIcon:
                        Icon(Icons.email_outlined, color: appColors.black!),
                    hintText: 'Entrez un texte...',
                    controller: context.read<HomeCubit>().suggestion,
                    validator: (suggestion) {
                      if (suggestion!.isEmpty) {
                        return 'Ce champ est requis...';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: getHeight(20, context),
                  ),
                  Center(
                    child: CommonWidgets.commonButton(
                      press: () {
                        Navigator.of(context).pop();
                        FocusScope.of(context).unfocus();
                        final homeCubit = context.read<HomeCubit>();
                        if (homeCubit.suggestion.text.trim().isNotEmpty) {
                          homeCubit.sendSuggestion();
                        }
                      },
                      text: 'Envoyer',
                      color: appColors.secondary!,
                      roundedBorders: true,
                      context: context,
                    ),
                  ),
                  SizedBox(
                    height: getHeight(20, context),
                  ),
                ],
              ),
            ));
  }
}
