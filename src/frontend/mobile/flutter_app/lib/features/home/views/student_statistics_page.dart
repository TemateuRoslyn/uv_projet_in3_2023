import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/enums.dart';
import '../../../common/widgets/common_widgets.dart';

class StudentStatisticPage extends StatefulWidget {
  const StudentStatisticPage({super.key});

  @override
  State<StudentStatisticPage> createState() => _StudentStatisticPageState();
}

class _StudentStatisticPageState extends State<StudentStatisticPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    final currentHomeState = _homeCubit.state;
    if (currentHomeState.fautes.isEmpty &&
        currentHomeState.convocations.isEmpty &&
        currentHomeState.cds.isEmpty &&
        currentHomeState.sanctions.isEmpty) {
      _homeCubit.getDataByType(dataType: 'allStudentData');
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return Column(
      children: [
        SizedBox(
          height: getHeight(50, context),
        ),
        BlocBuilder<HomeCubit, HomeState>(
          buildWhen: (previous, current) => (previous.fautes !=
                  current.fautes ||
              previous.convocations != current.convocations ||
              previous.cds != current.cds ||
              previous.sanctions != current.sanctions ||
              previous.allStudentDataStatus != current.allStudentDataStatus ||
              previous.allStudentDataStatusMessage !=
                  current.allStudentDataStatusMessage),
          builder: (context, state) {
            return CheckInternetConnectionPage(
              helper: state.fautes.isEmpty &&
                      state.convocations.isEmpty &&
                      state.cds.isEmpty &&
                      state.sanctions.isEmpty
                  ? 0
                  : 1,
              positionFromTop: (screenSize.height / 2),
              errorTextColor: appColors.primary!,
              body: state.allStudentDataStatus == ApiStatus.isLoading
                  ? CommonWidgets.circularProgressIndicatorWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      color: appColors.onBoardingTwo!)
                  : state.allStudentDataStatus == ApiStatus.failed
                      ? CommonWidgets.failedStatusWidget(
                          positionFromTop: (screenSize.height / 2),
                          context: context,
                          statusMessage: state.allStudentDataStatusMessage,
                          color: Colors.white,
                          reloadFunction: () => _homeCubit.getDataByType(
                              dataType: 'allStudentData'))
                      : Wrap(
                          runSpacing: getHeight(20, context),
                          spacing: getWidth(15, context),
                          children: [
                            StatisticComponent(
                              imagePath: AppImages.fault,
                              title: 'Fautes',
                              number: state.fautes.length,
                            ),
                            StatisticComponent(
                              imagePath: AppImages.convocation,
                              title: 'Convocations',
                              number: state.convocations.length,
                            ),
                            StatisticComponent(
                              imagePath: AppImages.disciplinaryCouncil,
                              title: 'Conseils de discipline',
                              number: state.cds.length,
                            ),
                            StatisticComponent(
                              imagePath: AppImages.sanction,
                              title: 'Sanctions',
                              number: state.sanctions.length,
                            ),
                          ],
                        ),
            );
          },
        ),
      ],
    );
  }
}

class StatisticComponent extends StatelessWidget {
  const StatisticComponent({
    super.key,
    required this.title,
    required this.number,
    required this.imagePath,
  });

  final String title;
  final int number;
  final String imagePath;

  Color componentColor(int number) {
    late Color color;
    if (number == 0) {
      color = Colors.green;
    } else if (number >= 1 && number <= 5) {
      color = Colors.grey;
    } else if (number > 5) {
      color = appColors.secondary!;
    }

    return color;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: getWidth(10, context), vertical: getHeight(10, context)),
      height: getHeight(150, context),
      width: getWidth(150, context),
      decoration: BoxDecoration(
          color: componentColor(number),
          borderRadius: BorderRadius.circular(10)),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              CircleAvatar(
                backgroundColor: Colors.white,
                radius: 18,
                child: Image.asset(
                  imagePath,
                  width: getWidth(30, context),
                  height: getHeight(30, context),
                ),
              ),
              Container(
                height: getHeight(30, context),
                width: getWidth(30, context),
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Colors.white),
                alignment: Alignment.center,
                child: Text(
                  number.toString(),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          Text(
            title,
            style: TextStyle(
                fontSize: getHeight(14, context),
                color: Colors.white,
                fontWeight: FontWeight.bold),
          )
        ],
      ),
    );
  }
}
