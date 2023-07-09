import 'package:fltter_app/common/models/user.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/home/widgets/cours_component.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/enums.dart';
import '../../../common/utils/helper.dart';
import '../../../common/widgets/common_widgets.dart';

class CoursPage extends StatefulWidget {
  const CoursPage({
    super.key,
    required this.user,
  });

  final User user;

  @override
  State<CoursPage> createState() => _CoursPageState();
}

class _CoursPageState extends State<CoursPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    _homeCubit.getDataByType(
        dataType: 'cours', classId: widget.user.classe!['id']);
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
        headerText: 'Mes cours',
        body: BlocBuilder<HomeCubit, HomeState>(
          buildWhen: (previous, current) =>
              (previous.coursStatus != current.coursStatus ||
                  previous.courss != current.courss),
          builder: (context, state) {
            return CheckInternetConnectionPage(
              helper: state.courss.isEmpty ? 0 : 1,
              positionFromTop: (screenSize.height / 2),
              errorTextColor: appColors.primary!,
              body: state.coursStatus == ApiStatus.isLoading
                  ? CommonWidgets.circularProgressIndicatorWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      color: appColors.primary!)
                  : state.coursStatus == ApiStatus.failed
                      ? CommonWidgets.failedStatusWidget(
                          positionFromTop: (screenSize.height / 2),
                          context: context,
                          statusMessage: state.fauteStatusMessage,
                          color: appColors.primary!,
                          reloadFunction: () => _homeCubit.getDataByType(
                              dataType: 'cours',
                              classId: widget.user.classe!['id']))
                      : state.courss.isEmpty
                          ? CommonWidgets.noDataWidget(
                              positionFromTop: (screenSize.height / 2),
                              context: context,
                              color: appColors.primary!)
                          : Expanded(
                              child: ListView(
                                  padding: EdgeInsets.only(
                                      // bottom: getHeight(10, context),
                                      top: getWidth(20, context),
                                      left: getWidth(10, context),
                                      right: getWidth(10, context)),
                                  children: state.courss
                                      .map((oneCours) => CoursComponent(
                                            currentUserType: 'eleves',
                                            courseTitle:
                                                '${oneCours.libelle} ( ${oneCours.dateCours}: ${oneCours.heureDebut} - ${oneCours.heureFin} )',
                                            teacherName:
                                                '${oneCours.professeur.firstName} ${oneCours.professeur.lastName}',
                                            onPressAction: () {},
                                          ))
                                      .toList()),
                            ),
            );
          },
        ));
  }
}
