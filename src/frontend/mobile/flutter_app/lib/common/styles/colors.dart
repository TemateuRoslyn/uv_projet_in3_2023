import 'package:flutter/material.dart';

class AppColors extends ThemeExtension<AppColors> {
  final Color? primary;
  final Color? secondary;
  final Color? tinary;
  final Color? onBoardingOne;
  final Color? onBoardingTwo;
  final Color? onBoardingThree;
  final Color? yellow;
  final Color? ligthGreen;
  final Color? white;
  final Color? black;

  AppColors({
    required this.primary,
    required this.secondary,
    required this.tinary,
    required this.onBoardingOne,
    required this.onBoardingTwo,
    required this.onBoardingThree,
    required this.yellow,
    required this.ligthGreen,
    required this.white,
    required this.black,
  });

  @override
  ThemeExtension<AppColors> copyWith({
    Color? primary,
    Color? secondary,
    Color? tinary,
    Color? onBoardingOne,
    Color? onBoardingTwo,
    Color? onBoardingThree,
    Color? yellow,
    Color? ligthGreen,
    Color? white,
    Color? black,
  }) {
    return AppColors(
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      tinary: tinary ?? this.tinary,
      onBoardingOne: onBoardingOne ?? this.onBoardingOne,
      onBoardingTwo: onBoardingTwo ?? this.onBoardingTwo,
      onBoardingThree: onBoardingThree ?? this.onBoardingThree,
      yellow: yellow ?? this.yellow,
      ligthGreen: ligthGreen ?? this.ligthGreen,
      white: white ?? this.white,
      black: black ?? this.black,
    );
  }

  @override
  ThemeExtension<AppColors> lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }

    return AppColors(
      primary: Color.lerp(primary, other.primary, t),
      secondary: Color.lerp(secondary, other.secondary, t),
      tinary: Color.lerp(tinary, other.tinary, t),
      onBoardingOne: Color.lerp(onBoardingOne, other.onBoardingOne, t),
      onBoardingTwo: Color.lerp(onBoardingTwo, onBoardingTwo, t),
      onBoardingThree: Color.lerp(onBoardingThree, other.onBoardingThree, t),
      yellow: Color.lerp(yellow, other.yellow, t),
      ligthGreen: Color.lerp(ligthGreen, other.ligthGreen, t),
      white: Color.lerp(white, other.white, t),
      black: Color.lerp(black, other.black, t),
    );
  }
}

final appColors = AppColors(
  // primary: const Color(0xffa4cccc),
  primary: const Color(0xffffffff),
  secondary: const Color(0xff1eb2a6),
  white: const Color(0xfff37721),
  tinary: const Color(0xff473f97),
  onBoardingOne: const Color(0xffffe8d4),
  onBoardingTwo: const Color(0xffd4f5ff),
  onBoardingThree: const Color(0xffffd4d4),
  yellow: const Color(0xffCCA424),
  ligthGreen: Color.fromARGB(255, 201, 53, 37),
  black: const Color(0xFF3d3939),
);
