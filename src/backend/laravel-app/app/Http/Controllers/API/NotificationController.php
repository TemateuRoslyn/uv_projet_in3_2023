<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;


use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\TestStatus\Notice;

class NotificationController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/notification/findAll",
     *     summary="Get all notifications",
     *     description="Retrieve a list of all notification",
     *     operationId="notificationIndex",
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
     *     tags={"notification"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Permission updated successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Notification"))
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
        $notifiaction = Notification::has('user')->with('user')->get();

        return response()->json([
            'message' => 'List of notifications',
            'success' => true,
            'content' => $notifiaction
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/notification/findOne/{id}",
     *     summary="Get notification information",
     *     description="Get information about a specific notification",
     *     operationId="viewNotification",
     *     tags={"notification"},
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
     *         description="ID of notification to get information for",
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
     *             @OA\Property(property="message", type="string", example="Notifcation not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="notification found"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Notification")
     *         )
     *     )
     * )
     */
    public function view($notificationid)
    {
        $notification = Notification::with('user')
                        ->find($notificationid);

        if ($notification) {
            $notificationData = $notification->toArray();
            $notificationData['email'] = $notification->user->email;

            return response()->json([
                'message' => 'Notification found',
                'success' => true,
                'content' => $notificationData
            ], 200);
        }else{
            return response()->json([
                'message' => 'Notification not found',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/notification/create",
     *     summary="Create a new notification",
     *     description="Create a new notification resource",
     *     operationId="createNotification",
     *     tags={"notification"},
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
     *                 required={"email", "labelle", "view"},
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),
     *                 @OA\Property(property="libelle", type="string", example="Call Out"),
     *                 @OA\Property(property="view", type="integer", example="1"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "email": {
     *                     "The email field is required."
     *                 },
     *                 "libelle": {
     *                     "The libelle field is required."
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
     *         response=422,
     *         description="Error - Validation failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                 "email": {
     *                     "The email must be a valid email address."
     *                 },
     *                 "password": {
     *                     "The password must be at least 8 characters."
     *                 },
     *                 "username": {
     *                     "The username field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Notification Created Successfully"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Notification")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'view' => 'required|integer',
            'email' => 'required|email|unique:users',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('email')),
        ]);

        $notification = Notification::create([
            'userId' => $user->id,
            'libelle' => $request->input('libelle'),
            'view' => $request->input('view'),
        ]);

        return response()->json([
            'message' => 'Notification created successfully',
            'success' => true,
            'content' => $notification
        ]);
    }


    /**
     * @OA\Put(
     *     path="/api/notification/update/{notificationId}",
     *     summary="Update notification's information",
     *     description="Update a notification's information",
     *     operationId="updateNotification",
     *     tags={"notification"},
     *      @OA\Parameter(
     *         name="notificationId",
     *         in="path",
     *         description="ID of notification to update in this request",
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
     *                 required={"email", "labelle", "view"},
     *                 @OA\Property(property="libelle", type="string", example="Call Out"),
     *                 @OA\Property(property="view", type="integer", example="1"),
     *                 @OA\Property(property="email", type="string", format="email", example="maestros.roslyn@gmail.com"),             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Notification not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="object", example={
     *                 "email": {
     *                     "The email field is required."
     *                 },
     *                 "password": {
     *                     "The password field is required."
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
     *             @OA\Property(property="message", type="string", example="Notification not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Notification updated successfully"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Notification")
     *          )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // on récupère la faute associé
        $notificationFound = Notification::find($id);
        if($notificationFound){
            $user = User::find($notificationFound->userId);
            $validator = Validator::make($request->all(), [
                'libelle' => 'required|string|max:255',
                'view' => 'required|integer',
                'email' => 'required|email|unique:users',    $user->id,
            ]);
        }else{
            return response()->json([
                'message' => 'Notification not found',
                'success' => false
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        // Mise à jour des champs de l'objet User
        $user->email = $request->input('email');
        $user->save();

            // Mise à jour des champs de l'objet Notification
            $notificationFound->libelle = $request->input('libelle');
            $notificationFound->view = $request->input('view');

            $notificationFound->save();
            $notificationFound->user = $user;

        return response()->json([
            'success' => true,
            'message' => 'Notification updated successfully',
            'content' => $notificationFound
        ]);
    }

    /**
     * @OA\Delete (
     *     path="/api/notification/delete/{id}",
     *     summary="Delete an notification",
     *     description="Delete an notification resource",
     *     operationId="deleteNotification",
     *     tags={"notification"},
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
     *         description="ID of notification to delete",
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
     *             @OA\Property(property="error", type="string", example="Notification not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Notification deleted successfully")
     *         )
     *     ),
     * )
     */
    public function delete(string $id)
    {
        $notificationFound = Notification::find($id);

        if ($notificationFound) {
            //le user associe
            $userFound = User::find($notificationFound->userId);

            //suppresion de la Notification
            $notificationFound->delete();


            return response()->json([
                'message' => 'Notification deleted successfully',
                'success' => true,
            ], 200);
        }else{
            return response()->json([
                'message' => 'Notification not found',
                'success' => false
            ], 404);
        }

    }
}
