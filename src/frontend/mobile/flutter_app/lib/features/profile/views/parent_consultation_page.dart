import 'package:fltter_app/common/models/user.dart';
import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/home/views/conseil_discipline_page.dart';
import 'package:fltter_app/features/home/views/convocation_page.dart';
import 'package:fltter_app/features/home/views/sanctions_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../common/utils/constants.dart';
import '../../home/views/fautes_page.dart';

class ParentConsultationPage extends StatefulWidget {
  const ParentConsultationPage({
    super.key,
    required this.child,
    required this.hisClass,
  });

  final User child;
  final dynamic hisClass;

  @override
  State<ParentConsultationPage> createState() => _ParentConsultationPageState();
}

class _ParentConsultationPageState extends State<ParentConsultationPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    _homeCubit.getChildInfosForParentConsultation(widget.child.id);
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    final List<String> childInfos = [
      'Nom: ${widget.child.firstName} ${widget.child.lastName}',
      'Sexe: ${widget.child.sexe}',
      'Classe: ${widget.hisClass['name']}',
      'Redouble: ${widget.child.redoublant == 0 ? 'NON' : 'OUI'}',
      'Telephone: ${widget.child.telephone}',
    ];

    return Scaffold(
        backgroundColor: appColors.primary,
        body: SafeArea(
            child: SingleChildScrollView(
                child: Padding(
          padding: EdgeInsets.only(
              left: getWidth(20, context),
              right: getWidth(20, context),
              top: getHeight(20, context)),
          child: BlocBuilder<HomeCubit, HomeState>(
            builder: (context, state) {
              return CheckInternetConnectionPage(
                helper: (state.cds.isEmpty &&
                        state.fautes.isEmpty &&
                        state.convocations.isEmpty)
                    ? 0
                    : 1,
                positionFromTop: (screenSize.height / 2),
                errorTextColor: Colors.black,
                body: state.parentConsultationStatus == ApiStatus.isLoading
                    ? CommonWidgets.circularProgressIndicatorWidget(
                        positionFromTop: (screenSize.height / 2),
                        context: context,
                        color: appColors.white!)
                    : state.parentConsultationStatus == ApiStatus.failed
                        ? CommonWidgets.failedStatusWidget(
                            positionFromTop: (screenSize.height / 2),
                            context: context,
                            statusMessage:
                                state.parentConsultationStatusMessage,
                            color: Colors.black,
                            reloadFunction: () =>
                                _homeCubit.getChildInfosForParentConsultation(
                                    widget.child.id))
                        : Column(
                            children: [
                              Container(
                                padding: EdgeInsets.symmetric(
                                    horizontal: getWidth(20, context),
                                    vertical: getHeight(30, context)),
                                // height: getHeight(200, context),
                                width: double.infinity,
                                decoration: BoxDecoration(
                                    color: appColors.tinary,
                                    borderRadius: BorderRadius.circular(10)),
                                child: Row(
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(100),
                                      child: Image.asset(
                                        AppImages.unknownPersonImg,
                                        height: getHeight(65, context),
                                        width: getWidth(65, context),
                                        // color: Colors.white,
                                      ),
                                    ),
                                    SizedBox(
                                      width: getWidth(30, context),
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        ...childInfos
                                            .map((info) =>
                                                InfosConponent(text: info))
                                            .toList(),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                height: getHeight(50, context),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(
                                    horizontal: getWidth(20, context)),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Categorie(s)',
                                      style: TextStyle(
                                          fontSize: getHeight(14, context),
                                          fontWeight: FontWeight.bold,
                                          color: appColors.black),
                                    ),
                                    Text(
                                      'Nombre(s)',
                                      style: TextStyle(
                                          fontSize: getHeight(14, context),
                                          fontWeight: FontWeight.bold,
                                          color: appColors.ligthGreen),
                                    ),
                                  ],
                                ),
                              ),
                              ...List.generate(4, (index) {
                                return CategorieIncidentComponent(
                                  image: index == 0
                                      ? AppImages.fault
                                      : index == 1
                                          ? AppImages.sanction
                                          : index == 2
                                              ? AppImages.convocation
                                              : AppImages.disciplinaryCouncil,
                                  onPressAction: () {
                                    Navigator.of(context)
                                        .push(MaterialPageRoute(
                                            builder: (context) => index == 0
                                                ? FautesPage(
                                                    childInfos: widget.child,
                                                  )
                                                : index == 1
                                                    ? SanctionsPage(
                                                        childInfos:
                                                            widget.child,
                                                      )
                                                    : index == 2
                                                        ? ConvocationPage(
                                                            childInfos:
                                                                widget.child,
                                                          )
                                                        : ConseilDisciplinePage(
                                                            childInfos:
                                                                widget.child,
                                                          )));
                                  },
                                  text: index == 0
                                      ? 'Fautes'
                                      : index == 1
                                          ? 'Sanctions'
                                          : index == 2
                                              ? 'Convocations'
                                              : 'Conseils de discipline',
                                  number: index == 0
                                      ? state.fautes.length.toString()
                                      : index == 1
                                          ? state.sanctions.length.toString()
                                          : index == 2
                                              ? state.convocations.length
                                                  .toString()
                                              : state.cds.length.toString(),
                                );
                              }),
                            ],
                          ),
              );
            },
          ),
        ))));
  }
}

class InfosConponent extends StatelessWidget {
  const InfosConponent({
    super.key,
    required this.text,
  });

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: getHeight(5, context)),
      width: getWidth(190, context),
      child: Text(
        text,
        style: TextStyle(
            fontSize: getHeight(14, context),
            // fontWeight: FontWeight.bold,
            color: Colors.white),
      ),
    );
  }
}

class CategorieIncidentComponent extends StatelessWidget {
  const CategorieIncidentComponent({
    super.key,
    required this.text,
    required this.number,
    required this.image,
    required this.onPressAction,
  });

  final String text;
  final String number;
  final String image;
  final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressAction,
      child: Container(
        padding: EdgeInsets.only(
            right: getWidth(50, context), left: getWidth(10, context)),
        margin: EdgeInsets.only(top: getHeight(30, context)),
        width: double.infinity,
        // color: Colors.teal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SizedBox(
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.white,
                    radius: 30,
                    child: Image.asset(
                      image,
                      width: getWidth(40, context),
                      height: getHeight(40, context),
                      // color: Colors.grey,
                    ),
                  ),
                  SizedBox(
                    width: getWidth(20, context),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        text,
                        style: TextStyle(
                            fontSize: getHeight(15, context),
                            fontWeight: FontWeight.bold,
                            color: appColors.black),
                      ),
                      Text(
                        'Cliquez...',
                        style: TextStyle(
                            fontSize: getHeight(12, context),
                            color: Colors.grey),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Text(
              number,
              style: TextStyle(
                  fontSize: getHeight(16, context),
                  fontWeight: FontWeight.bold,
                  color: appColors.ligthGreen),
            ),
          ],
        ),
      ),
    );
  }
}
