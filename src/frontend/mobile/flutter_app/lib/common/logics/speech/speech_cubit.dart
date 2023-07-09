import 'package:bloc/bloc.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'speech_state.dart';
part 'speech_cubit.freezed.dart';

class SpeechCubit extends Cubit<SpeechState> {
  // ignore: prefer_const_constructors
  SpeechCubit() : super(SpeechState());

  final FlutterTts _flutterTts = FlutterTts();

  void startSpeeching({String? text}) async {
    emit(state.copyWith(speechType: SpeechType.isSpeeching));
    const textToRead =
        'De tout temps, l\'homme a tenté de comprendre puis de reproduire l\'extraordinaire machine qu\'est l\'être humain.';
    await _flutterTts.setLanguage('fr-FR');
    await _flutterTts.setPitch(1.0);
    await _flutterTts.setVolume(1.0);
    _flutterTts.setProgressHandler((text, start, end, word) {
      print('word is $word');
      print('end is $end');
    });
    _flutterTts.setCompletionHandler(() {
      print('completed');
      emit(state.copyWith(speechType: SpeechType.speechClosed));
    });
    print('object is ${state.speechType}');
    await _flutterTts.speak(text ?? textToRead);
  }

  void stopSpeeching() async {
    await _flutterTts.stop();
    emit(state.copyWith(speechType: SpeechType.speechClosed));
  }

  void pauseSpeech() async {
    await _flutterTts.pause();
    emit(state.copyWith(speechType: SpeechType.speechPaused));
  }
}
