<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function showAll()
    {
        $notifs = Notification::all();
        return response()->json($notifs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'view' => 'required|integer',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        $req = $request->all();
        $req['view'] = intval($req['view']);
        $notif = Notification::create($req);
        return response()->json($notif, 200);
    }

    public function showIndex($id)
    {
        $notif = Notification::findOrFail($id);
        return response()->json($notif);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'view' => 'required|integer',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        $notif = Notification::findOrFail($id);
        $notif->update($request->all());
        return response()->json($notif);
    }

    public function delete($id)
    {
        $notif = Notification::findOrFail($id);
        $notif->delete();
        return response()->json(null, 200);
    }
}
