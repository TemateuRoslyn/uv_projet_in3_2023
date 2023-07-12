<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Queue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use Illuminate\Validation\Rule;

use App\Models\SanctionPrevu;
use App\Models\Eleve;
use App\Models\Faute;
use Twilio\Rest\Client;
use Twilio\Exceptions\TwilioException;

class SanctionPrevuController extends Controller
{

    private $twilioInfo;

    public function __construct()
    {
        $this->twilioInfo = [
            "+237654770063" => ["ACfaf8a483f11bbd6983f6e567732a36c1", "cacd62d64ab0c916c8a63752cab16538", "+18145244457"],
            "+237651779272" => ["ACb3959badcd79d88b411fd167596988ce", "7867db4dfd97896e23032f1ed8eb004b", "+15418593377"],
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/sanctionprevus/findAll",
     *     summary="Get all sanctionprevus",
     *     description="Retrieve a list of all sanctionprevus",
     *     operationId="sanctionprevusIndex",
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     security={{"bearerAuth":{}}},
     *     tags={"sanctionprevus"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des sanctions prevus"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/SanctionPrevu"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $sanctionprevus = SanctionPrevu::with('eleve.user','faute.regle.reglementInterieur', 'eleve.classe')->has('eleve')->get();

        return response()->json([
            'message' => 'Liste des sanctions prevus',
            'success' => true,
            'content' => $sanctionprevus
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/sanctionprevus/findOne/{id}",
     *     summary="Get sanctionprevu information",
     *     description="Get information about a specific sanctionprevu",
     *     operationId="viewSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of sanctionprevu to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *         )
     *     )
     * )
     */
    public function view($sanctionprevuId)
    {
        $sanctionprevu = SanctionPrevu::with('eleve.user','faute.regle.reglementInterieur')
            ->find($sanctionprevuId);

        if ($sanctionprevu) {
            $sanctionprevuData = $sanctionprevu->toArray();

            return response()->json([
                'message' => 'sanctionprevu trouvé(e)',
                'success' => true,
                'content' => $sanctionprevuData
            ], 200);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu non trouvé',
                'success' => false,
            ], 404);
        }
    }


    /**
     * @OA\Get(
     *     path="/api/sanctionprevus/findAll/eleve/{eleveId}",
     *     summary="Get sanctionprevus information for a student",
     *     description="Get information about all specific sanctionprevus to a student",
     *     operationId="viewSanctionPrevusEleve",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="eleveId",
     *         in="path",
     *         description="ID of Eleve to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *               @OA\Property(property="message", type="string", example="sanctionprevus de l\'eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="sanctionprevus de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *         )
     *     )
     * )
     */
    public function viewSanctionPrevusEleve($eleveId)
    {

        $eleve = SanctionPrevu::where('eleveId', $eleveId)->with(['eleve.user', 'faute.regle.reglementInterieur'])->get();


        if ($eleve) {
            return response()->json([
                'message' => 'sanctionprevus de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $eleve
            ], 200);
        } else {
            return response()->json([
                'message' => 'sanctionprevus de l\'eleve non trouvée',
                'success' => false,
            ], 404);
        }
    }


    /**
     * @OA\Post(
     *     path="/api/sanctionprevus/create",
     *     summary="Create a new sanctionprevu",
     *     description="Create a new sanctionprevu resource",
     *     operationId="createSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"libelle","dureeValidite","eleveId","fauteId"},
     *                 @OA\Property(property="libelle", type="string", example="libelle de la sanction"),
     *                 @OA\Property(property="dureeValidite", type="date", example="duree de la Validite de la sanction"),
     *                 @OA\Property(property="eleveId", type="integer", example=1),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 },
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error - Validation failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "libelle": {
     *                     "The libelle must be at least 8 characters."
     *                 },
     *                 "dureeValidite": {
     *                     "The dureeValidite field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu créé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'dureeValidite' => 'required|date',
            'eleveId' => [
                'required',
                'integer',
                Rule::exists('eleves', 'id')->where(function ($query) use ($request) {
                    $query->where('id', $request->eleveId);
                })
            ],
            'fauteId' => [
                'required',
                'integer',
                Rule::exists('fautes', 'id')->where(function ($query) use ($request) {
                    $query->where('id', $request->fauteId);
                })
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this sanctionprevu',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $sanctionprevu = SanctionPrevu::create([
            'eleveId' => $request->input('eleveId'),
            'fauteId' => $request->input('fauteId'),
            'libelle' => $request->input('libelle'),
            'dureeValidite' => $request->input('dureeValidite'),
        ]);

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;

        $faute = Faute::with('regle.reglementInterieur')->find($request->fauteId);

        $sanctionprevu->eleve = $eleve;
        $sanctionprevu->faute = $faute;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez recu une sanction ( $sanctionprevu->libelle ) car vous avez enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details de la Sanction";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a recu une sanction ( $sanctionprevu->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details de la Sanction";
            $detailsP['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
            $detailsP['endtext'] = "Merci de rester fidele à cet etablissement";

            // envoi du mail
            Queue::push(new SendEmailJob($parent->user, $detailsP));

            //Envoie du sms
            if (array_key_exists($parent->telephone, $this->twilioInfo)) {
                $valeurs = $this->twilioInfo[$parent->telephone];

                $twilioSid = $valeurs[0];
                $twilioToken = $valeurs[1];
                $twilioPhoneNumber = $valeurs[2];

                $phoneNumber = $parent->telephone;

                try {
                    $twilio = new Client($twilioSid, $twilioToken);

                    // Vérifier si le numéro de téléphone est valide
                    $twilio->lookups->v1->phoneNumbers($phoneNumber)->fetch();

                    // Si aucune exception n'est levée, le numéro est valide, envoyer le message
                    $message = $twilio->messages->create(
                        $phoneNumber,
                        [
                            'from' => $twilioPhoneNumber,
                            'body' => $detailsP['body']
                        ]
                    );


                } catch (TwilioException $e) {
                    // return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'envoi du message : ' . $e->getMessage());
                }
            }

            $detailsP = array();
        }

        return response()->json([
            'message' => 'SanctionPrevu created successfully',
            'success' => true,
            'content' => $sanctionprevu,
        ]);
    }


    /**
     * @OA\post(
     *     path="/api/sanctionprevus/update/{sanctionprevuId}",
     *     summary="Update a sanctionprevu's information",
     *     description="Update a sanctionprevu's information",
     *     operationId="updateSanctionPrevu",
     *     tags={"sanctionprevus"},
     *      @OA\Parameter(
     *         name="sanctionprevuId",
     *         in="path",
     *         description="ID of sanctionprevu to update in this request",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"libelle","dureeValidite","eleveId","fauteId"},
     *                 @OA\Property(property="libelle", type="string", example="libelle de la sanction"),
     *                 @OA\Property(property="dureeValidite", type="date", example="duree de la Validite de la sanction"),
     *                 @OA\Property(property="eleveId", type="integer", example=1),
     *                 @OA\Property(property="fauteId", type="integer", example=1),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "eleveId": {
     *                     "The eleveId field is required."
     *                 },
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu non trouve(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="SanctionPrevu modifié qvec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/SanctionPrevu")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {

        // on récupère la sanctionprevu associé
        $sanctionprevuFound = SanctionPrevu::find($id);
        if ($sanctionprevuFound) {
            $validator = Validator::make($request->all(), [
                'libelle' => 'required|string',
                'dureeValidite' => 'required|date',
                'eleveId' => [
                    'required',
                    'integer',
                    Rule::exists('eleves', 'id')->where(function ($query) use ($request) {
                        $query->where('id', $request->eleveId);
                    })
                ],
                'fauteId' => [
                    'required',
                    'integer',
                    Rule::exists('fautes', 'id')->where(function ($query) use ($request) {
                        $query->where('id', $request->fauteId);
                    })
                ],
            ]);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this sanctionprevu',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        // Mise à jour des champs de l'objet SanctionPrevu
        $sanctionprevuFound->libelle = $request->input('libelle');
        $sanctionprevuFound->dureeValidite = $request->input('dureeValidite');
        $sanctionprevuFound->eleveId = $request->input('eleveId');
        $sanctionprevuFound->fauteId = $request->input('fauteId');

        $sanctionprevuFound->save();

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;
        $faute = Faute::with('regle.reglementInterieur')->find($request->fauteId);

        $sanctionprevuFound->eleve = $eleve;
        $sanctionprevuFound->faute = $faute;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez recu une sanction ( $sanctionprevuFound->libelle ) car vous avez enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details de la Sanction";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a recu une sanction ( $sanctionprevuFound->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details de la Sanction";
            $detailsP['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
            $detailsP['endtext'] = "Merci de rester fidele à cet etablissement";

            // envoi du mail
            Queue::push(new SendEmailJob($parent->user, $detailsP));
            $detailsP = array();
        }


        return response()->json([
            'message' => 'SanctionPrevu updated successfully',
            'success' => true,
            'content' => $sanctionprevuFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/sanctionprevus/delete/{id}",
     *     summary="Delete an sanctionprevu",
     *     description="Delete an sanctionprevu resource",
     *     operationId="deleteSanctionPrevu",
     *     tags={"sanctionprevus"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of sanctionprevu to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="SanctionPrevu not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="SanctionPrevu deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($sanctionprevuId)
    {
        $sanctionprevuFound = SanctionPrevu::find($sanctionprevuId);

        if ($sanctionprevuFound) {

            //suppression du sanctionprevu
            $sanctionprevuFound->delete();

            return response()->json([
                'message' => 'SanctionPrevu deleted successfully',
                'success' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'SanctionPrevu to delete was not found',
                'success' => false,
            ], 404);
        }
    }
}
