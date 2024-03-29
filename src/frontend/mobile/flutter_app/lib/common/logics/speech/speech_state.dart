part of 'speech_cubit.dart';

@freezed
class SpeechState with _$SpeechState {
  const factory SpeechState({
    @Default(SpeechType.init) SpeechType speechType,
    @Default('') String textToSpeech,
  }) = _Initial;
}
