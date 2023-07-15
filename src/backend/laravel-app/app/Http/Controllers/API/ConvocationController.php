<?php

namespace App\Http\Controllers\API;

use App\Models\Convocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Personnel;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendEmailJob;
use App\Models\Eleve;
use Twilio\Rest\Client;
use Twilio\Exceptions\TwilioException;

//evenements
use App\Events\ConvocationCreatedEvent;

class ConvocationController extends Controller
{

    private $twilioInfo;

    public function __construct()
    {
        $this->twilioInfo = [
            "+237654770063" => ["ACfaf8a483f11bbd6983f6e567732a36c1", "cacd62d64ab0c916c8a63752cab16538", "+18145244457"],
            "+237651779272" => ["ACb3959badcd79d88b411fd167596988ce", "7867db4dfd97896e23032f1ed8eb004b", "+15418593377"],
            "+237672324141" => ["ACcaa8940df3a10841cdedb68aa4083dab", "322e18f99a5b4e7f35ba50df09942498", "+12342901968"],
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/convocation/findAll",
     *     summary="Get all convocation",
     *     description="Retrieve a list of all convocation",
     *     operationId="indexConvocation",
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
     *     tags={"convocation"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des convocations"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Convocation"))
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
        $convocations = Convocation::with('personnel', 'eleve')->get();

        return response()->json([
            'message' => 'Liste des convocations',
            'success' => true,
            'content' => $convocations
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/convocation/findOne/{id}",
     *     summary="Get convocation information",
     *     description="Get information about a specific convocation",
     *     operationId="viewConvocation",
     *     tags={"convocation"},
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
     *         description="ID of Convocation to get information for",
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
     *               @OA\Property(property="message", type="string", example="Convocation not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Convocation trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Convocation")
     *         )
     *     )
     * )
     */
    public function view($convocationId)
    {

        $convocation = Convocation::with('personnel')
            ->has('eleve')->with('eleve')
            ->find($convocationId);


        if ($convocation) {

            $convocationData = $convocation->toArray();
            $convocationData['firstName'] = $convocation->personnel->firstName;

            return response()->json([
                'message' => 'convocation trouvé(e)',
                'success' => true,
                'content' => $convocationData
            ], 200);
        } else {
            return response()->json([
                'message' => 'convocation non trouvée',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/convocation/findAll/eleve/{eleveId}",
     *     summary="Get convocation information for a student",
     *     description="Get information about all specific convocation to a student",
     *     operationId="viewConvocationEleve",
     *     tags={"convocation"},
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
     *               @OA\Property(property="message", type="string", example="convocations de l\'eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="convocations de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Convocation")
     *         )
     *     )
     * )
     */
    public function viewConvocationEleve($eleveId)
    {

        $eleve = Convocation::where('eleveId', $eleveId)->with(['eleve', 'personnel'])->get();


        if ($eleve) {
            return response()->json([
                'message' => 'convocations de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $eleve
            ], 200);
        } else {
            return response()->json([
                'message' => 'convocations de l\'eleve non trouvée',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/convocation/create",
     *     summary="Create a new convocation",
     *     description="Create a new convocation resource",
     *     operationId="createConvocation",
     *     tags={"convocation"},
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
     *         @OA\JsonContent(
     *           required={"libelle", "dateConvocation", "dateRdv", "statut","personnelId", "eleveId"},
     *             @OA\Property(property="libelle", type="string", example="vous X eleve dans mon etablissement"),
     *                 @OA\Property(property="dateConvocation", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="dateRdv", type="string", format="date", example="1990-01-01"),
     *                 @OA\Property(property="statut", type="string", example="achevee,annulee"),
     *                 @OA\Property(property="personnelId", type="integer", example="1"),
     *                 @OA\Property(property="eleveId", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 }
     *             }),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Convocation created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/Convocation")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'dateConvocation' => 'required|date',
            'dateRdv' => 'required|date',
            'statut' => 'required',
            'personnelId' => 'required|exists:personnels,id',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this convocation',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $convocation = Convocation::create([
            'libelle' => $request->input('libelle'),
            'dateConvocation' => $request->input('dateConvocation'),
            'dateRdv' => $request->input('dateRdv'),
            'statut' => $request->input('statut'),
            'personnelId' => $request->input('personnelId'),
            'eleveId' => $request->input('eleveId'),
        ]);


        $convocation->load('personnel', 'eleve');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez recu une convocation ( $convocation->libelle ) car vous avez enfrein une une des regles de l'etablissement .
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
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a recu une convocation ( $convocation->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
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

        //envoie de l'evenement
        try{

            event(new ConvocationCreatedEvent("convocation creer",$convocation));

        }catch(\Exception $e){

        }

        return response()->json([
            'message' => 'convocation created successfully',
            'success' => true,
            'content' => $convocation
        ], 200);
    }


    /**
     * @OA\Put(
     *     path="/api/convocation/update/{convocationId}",
     *     summary="Update a convocation's information",
     *     description="Update a convocation's information",
     *     operationId="updateConvocation",
     *     tags={"convocation"},
     *      @OA\Parameter(
     *         name="convocationId",
     *         in="path",
     *         description="ID of convocation to update in this request",
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
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"libelle","dateConvocation","dateRdv","statut","personnelId"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Etre assidue"),
     *             @OA\Property(property="dateConvocation", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="dateRdv", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="statut", type="string", format="text",  example="grave"),
     *             @OA\Property(property="personnelId", type="integer", example=1),
     *
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
     *                 "statut": {
     *                     "The statut field is required."
     *                 }
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
     *             @OA\Property(property="error", type="string", example="Convocation not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Convocation modifié avec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Convocation")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // on récupère la convocation associé
        $convocationFound = Convocation::find($id);
        if ($convocationFound) {

            $validator = Validator::make($request->all(), [
                'libelle' => 'required',
                'dateConvocation' => 'required|date',
                'dateRdv' => 'required|date',
                'statut' => 'required',
                'personnelId' => 'required|integer|exists:personnels,id',

            ]);
        } else {
            return response()->json([
                'message' => 'convocation not exists',
                'success' => false,
            ], 400);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this convocation',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }


        // Mise à jour des champs de l'objet convocation
        $convocationFound->libelle = $request->input('libelle');
        $convocationFound->dateConvocation = $request->input('dateConvocation');
        $convocationFound->dateRdv = $request->input('dateRdv');
        $convocationFound->statut = $request->input('statut');
        $convocationFound->personnelId = $request->input('personnelId');
        $convocationFound->eleveId = $request->input('eleveId');


        $convocationFound->save();

        $convocationFound->load('personnel', 'eleve');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez recu une convocation ( $convocationFound->libelle ) car vous avez enfrein une une des regles de l'etablissement .
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
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a recu une convocation ( $convocationFound->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
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

        //envoie de l'evenement
        try{

            event(new ConvocationCreatedEvent("convocation modifier",$convocationFound));

        }catch(\Exception $e){

        }

        return response()->json([
            'message' => 'Convocation updated successfully',
            'success' => true,
            'content' => $convocationFound
        ]);
    }
    /**
     * @OA\Delete (
     *     path="/api/convocation/delete/{id}",
     *     summary="Delete an convocation",
     *     description="Delete an convocation resource",
     *     operationId="deleteConvocation",
     *     tags={"convocation"},
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
     *         description="ID of convocation to delete",
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
     *             @OA\Property(property="error", type="string", example="convocation not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="convocation deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="convocation deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete($convocationId)
    {
        $convocation = Convocation::find($convocationId);

        if ($convocation) {
            $convocation->delete();
            return response()->json([
                'message' => 'convocation deleted successfully',
                'success' => true,
            ], 202);
        }


        return response()->json([
            'message' => 'convocation not found',
            'success' => false
        ], 404);
    }
}
