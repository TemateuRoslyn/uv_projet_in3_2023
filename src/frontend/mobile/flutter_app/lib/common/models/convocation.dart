class Convocation {
  final int id;
  final String libelle;
  final String dateConvocation;
  final String dateRdv;
  final String statut;
  final String createdAt;
  final String updatedAt;

  Convocation({
    required this.id,
    required this.libelle,
    required this.dateConvocation,
    required this.dateRdv,
    required this.statut,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Convocation.fromJson(Map<String, dynamic> json) {
    var statut = json['statut'];
    final dateRdv = DateTime.parse(json['dateRdv']);
    final currentDate = DateTime.now();
    if (currentDate.isAfter(dateRdv)) {
      statut = 'Passé';
    } else {
      statut = 'À venir';
    }

    return Convocation(
      id: json['id'],
      libelle: json['libelle'],
      dateConvocation: json['dateConvocation'],
      dateRdv: json['dateRdv'],
      statut: statut,
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
    );
  }
}
