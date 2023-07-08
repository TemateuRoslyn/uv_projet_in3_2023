import 'package:fltter_app/common/models/faute.dart';
import 'package:fltter_app/common/models/user.dart';

class Sanction {
  final String libelle;
  final String dureeValidite;
  final int eleveId;
  final int fauteId;
  final User eleve;
  final Faute faute;

  Sanction({
    required this.libelle,
    required this.dureeValidite,
    required this.eleveId,
    required this.fauteId,
    required this.eleve,
    required this.faute,
  });

  factory Sanction.fromJson(Map<String, dynamic> json) => Sanction(
        libelle: json['libelle'],
        dureeValidite: json['dureeValidite'],
        eleveId: json['eleveId'],
        fauteId: json['fauteId'],
        eleve: User.fromJson(json['eleve']),
        faute: Faute.fromJson(json['faute']),
      );
}
