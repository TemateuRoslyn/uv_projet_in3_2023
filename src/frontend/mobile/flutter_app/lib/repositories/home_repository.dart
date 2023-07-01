import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:fltter_app/common/models/reglement_interieur.dart';
import 'package:fltter_app/repositories/auth_repository.dart';

import '../common/models/faute.dart';

class HomeRepository {
  // HomeRepository({
  //   required this.authRepository,
  // }) {}

  // final AuthRepository authRepository;

  final dio = ApiConfiguration.dioClient;

  Future<List<ReglementInterieur>> getAllReglementInterieur() async {
    try {
      final response = await dio.get(
        'reglement/findAll',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<ReglementInterieur> riData = [];

      final data = response.data!['content'] as List;
      for (var ri in data) {
        riData.add(ReglementInterieur.fromJson(ri));
      }

      return riData;
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Faute>> getAllUserFautes() async {
    try {
      final response = await dio.get(
        'faute/findOne/${AuthRepository.getUserId}',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<Faute> fautes = [];

      final fautesData = response.data!['content'] as List;
      for (var faute in fautesData) {
        fautes.add(Faute.fromJson(faute));
      }

      return fautes;
    } catch (e) {
      rethrow;
    }
  }
}
