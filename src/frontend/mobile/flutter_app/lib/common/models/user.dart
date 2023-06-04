class User {
  final int id;
  final int solvable;
  final int redoublant;
  final String firstName;
  final String lastName;
  final String email;
  final String dateDeNaissance;
  final String lieuDeNaissance;
  final String photo;
  final String sexe;
  final String telephone;
  final int userId;
  final Map<String, dynamic> classe;
  final String createdAt;
  final String updatedAt;

  User({
    required this.id,
    required this.solvable,
    required this.redoublant,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.dateDeNaissance,
    required this.lieuDeNaissance,
    required this.photo,
    required this.sexe,
    required this.telephone,
    required this.userId,
    required this.classe,
    required this.createdAt,
    required this.updatedAt,
  });

  User copyWith({
    int? id,
    int? solvable,
    int? redoublant,
    String? firstName,
    String? lastName,
    String? email,
    String? dateDeNaissance,
    String? lieuDeNaissance,
    String? photo,
    String? sexe,
    String? telephone,
    int? userId,
    Map<String, dynamic>? classe,
    String? createdAt,
    String? updatedAt,
  }) =>
      User(
          id: id ?? this.id,
          solvable: solvable ?? this.solvable,
          redoublant: redoublant ?? this.redoublant,
          firstName: firstName ?? this.firstName,
          lastName: lastName ?? this.lastName,
          email: email ?? this.email,
          dateDeNaissance: dateDeNaissance ?? this.dateDeNaissance,
          lieuDeNaissance: lieuDeNaissance ?? this.lieuDeNaissance,
          photo: photo ?? this.photo,
          sexe: sexe ?? this.sexe,
          telephone: telephone ?? this.telephone,
          userId: userId ?? this.userId,
          classe: classe ?? this.classe,
          createdAt: createdAt ?? this.createdAt,
          updatedAt: updatedAt ?? this.updatedAt);

  factory User.fromJson(Map<String, dynamic> json) => User(
      id: json['id'],
      solvable: json['solvable'],
      redoublant: json['redoublant'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      dateDeNaissance: json['dateDeNaissance'],
      lieuDeNaissance: json['lieuDeNaissance'],
      photo: json['photo'],
      sexe: json['sexe'],
      telephone: json['telephone'],
      userId: json['userId'],
      classe: json['classe'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at']);
}
