<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class GalleryController extends Controller
{

    public function index() {
        $gallery = DB::table('gallery')->orderBy('id', 'DESC')->get(['id','slug','page_name','title','status','created_at']);
        return view('backend.pages.gallery.index', compact('gallery'));
    }


    public function add() {
        return view('backend.pages.gallery.add');
    }  
    
    public function create(Request $request)
{
    // Validate input fields
    $validator = Validator::make($request->all(), [
        'slug' => 'required|unique:gallery,slug',
        'page_name' => 'required',
        'thum_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'notification' => $validator->errors()->all()
        ], 200);
    }

    // Generate slug
    $slug = $request->filled('slug') ? customSlug($request->input('slug')) : null;

    // Handle banner image upload
    $bannerPath = $request->hasFile('banner') 
        ? $request->file('banner')->store('assets/banner', 'public') 
        : null;

    // Handle thumbnail image upload
    $thum_imagePath = $request->hasFile('thum_image') 
        ? $request->file('thum_image')->store('assets/gallery/thum_images', 'public') 
        : null;

    // Process image description (text and images)
    $image_description = [];
    if ($request->has('image_description')) {
        $image_description_imgs = [];
        
        foreach ($request->file('image_description', []) as $index => $file) {
            $imagePath = $file->store('assets/image_description', 'public');
            $image_description_imgs[$index] = $imagePath;
        }
        
        foreach ($request->input('image_description_text', []) as $index => $text) {
            $image_description[] = [
                'text' => $text,
                'image' => $image_description_imgs[$index] ?? null,
            ];
        }
    }

    // Process gallery images
    $images = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images', []) as $file) {
            $images[] = $file->store('assets/gallery/images', 'public');
        }
    }

    // Process video URLs
    $videos_urls = array_filter($request->input('gallery_videos', []), function ($value) {
        return !is_null($value);
    });

    // Insert into the database
    DB::table('gallery')->insert([
        'slug' => $slug,
        'page_name' => $request->input('page_name'),
        'banner' => $bannerPath,
        'thum_image' => $thum_imagePath,
        'title' => $request->input('title'),
        'short_description' => $request->input('short_description') ?? null,
        'videos' => !empty($videos_urls) ? json_encode($videos_urls) : null,
        'image_description' => !empty($image_description) ? json_encode($image_description) : null,
        'images' => !empty($images) ? json_encode($images) : null,
    ]);

    // Return response
    return response()->json([
        'status' => true,
        'notification' => 'Gallery added successfully!',
    ]);
}


   /* public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'slug' => 'required|unique:gallery,slug',
            'page_name' => 'required',
            'banner' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'thum_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'short_description' => 'required',
            'title' => 'required',
            'image_description.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'images' => 'required',
            'gallery_videos' => 'required',
           
        ], [
            'banner.required' => 'The banner image is required.',
            'banner.image' => 'The banner must be an image.',
            'banner.mimes' => 'The banner must be a file of type: jpeg, png, jpg, webp.',
            'banner.max' => 'The banner may not be greater than 2 MB.',

            'thum_image.required' => 'The thum image image is required.',
            'thum_image.image' => 'The thum image must be an image.',
            'thum_image.mimes' => 'The thum image must be a file of type: jpeg, png, jpg, webp.',
            'thum_image.max' => 'The thum image may not be greater than 2 MB.',
            
            'images.required' => 'The image image is required.',
            'images.image' => 'The image must be an image.',
            'images.mimes' => 'The image must be a file of type: jpeg, png, jpg, webp.',
            'images.max' => 'The image may not be greater than 2 MB.',

            'slug.required' => 'The slug is required.',
            'slug.unique' => 'The slug must be unique.',
    
            'title.required' => 'The title is required.',
            'short_description.required' => 'The Short Description is required.',
            
            'gallery_videos.required' => 'The Video is required.',

            'page_name.required' => 'The page name is required.',
    
            'image_description.*.required' => 'The gallery images are required.',
            'image_description.*.image' => 'Each gallery image must be an image.',
            'image_description.*.mimes' => 'Each gallery image must be a file of type: jpeg, png, jpg, webp.',
            'image_description.*.max' => 'Each gallery image may not be greater than 2 MB.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'notification' => $validator->errors()->all()
            ], 200);
        }
    
        $slug = customSlug($request->input('slug'));
    


        if ($request->hasFile('banner')) {
            $file = $request->file('banner');
            $bannerPath = $file->store('assets/banner/', 'public');
        }

        

        if ($request->hasFile('thum_image')) {
            $file = $request->file('thum_image');
            $thum_imagePath = $file->store('assets/gallery/thum_images', 'public');
        }

        $image_description = [];

        $image_description_img = [];
        if($request->has('image_description')){
            foreach ($request->file('image_description') as $index => $file) {
                $ImagePath = $file->store('assets/image_description/', 'public');
                $image_description_img[$index] = $ImagePath;
            }
        }

        // Process image_description texts and files
        foreach ($request->image_description_text as $index => $text) {

            $image_description_text_image = [
                'text' => $text,
                'image' => $image_description_img[$index],
            ];

            $image_description[] = $image_description_text_image;
        }


        // Initialize images array
        $images = [];
            
        // Process new and old images
        $oldImages = $request->input('images', []);
        $newImages = $request->file('images', []);

        // Iterate over old images and keep them in the images array
        foreach ($oldImages as $index => $oldImagePath) {
            if (!empty($newImages[$index])) {
                // If a new image is uploaded for this index, store it
                $file = $newImages[$index];
                $imagePath = $file->store('assets/gallery/images', 'public');
                $images[] = $imagePath;
            } else {
                // If no new image is uploaded, keep the old image
                $images[] = $oldImagePath;
            }
        }

        // Add any new images that were added after the last old image index
        foreach ($newImages as $index => $file) {
            if ($index >= count($oldImages)) {
                $imagePath = $file->store('assets/gallery/images', 'public');
                $images[] = $imagePath;
            }
        }

        // Remove null values from the array
        $images = array_filter($images, function($value) { return !is_null($value); });



        // Get all video URLs from the request
        $videos_urls = $request->input('gallery_videos');

        // $videos = [];
            
        // // Process new and old videos
        // $oldVideos = $request->input('gallery_videos', []);
        // $newVideos = $request->file('gallery_videos', []);

        // // Iterate over old videos and keep them in the videos array
        // foreach ($oldVideos as $index => $oldVideoPath) {
        //     if (!empty($newVideos[$index])) {
        //         // If a new image is uploaded for this index, store it
        //         $file = $newImages[$index];
        //         $videoPath = $file->store('assets/videos', 'public');
        //         $videos[] = $videoPath;
        //     } else {
        //         // If no new image is uploaded, keep the old image
        //         $videos[] = $oldVideoPath;
        //     }
        // }

        // // Add any new videos that were added after the last old image index
        // foreach ($newVideos as $index => $file) {
        //     if ($index >= count($oldImages)) {
        //         $videoPath = $file->store('assets/videos', 'public');
        //         $videos[] = $videoPath;
        //     }
        // }

        // $videos = array_filter($videos, function($value) { return !is_null($value); });

    
        DB::table('gallery')->insert([
            'slug' => $slug,
            'page_name' => $request->input('page_name'),
            'banner' => $bannerPath,
            'thum_image' => $thum_imagePath,
            'title' => $request->input('title'),
            'short_description' => $request->input('short_description'),
            'videos' => json_encode($videos_urls),
            'image_description' => json_encode($image_description), // Store as JSON
            'images' => json_encode(array_values($images)),
            // 'videos' => json_encode(array_values($videos)),
        ]);
    
        $response = [
            'status' => true,
            'notification' => 'Service added successfully!',
        ];
    
        return response()->json($response);
    }*/

    public function edit($id) {
        $gallery = DB::table('gallery')->where('id',$id)->get()->first();
        $image_description = json_decode($gallery->image_description);
        $images = json_decode($gallery->images);
        $videos = json_decode($gallery->videos);
        return view('backend.pages.gallery.edit', compact('gallery','image_description','images','videos'));
    }  
    
    public function delete($id) {

        $count = DB::table('gallery')->count();
        if($count > 1 ){
            $service = DB::table('gallery')->where('id', $id);
            if (!$service) {
                $response = [
                    'status' => false,
                    'notification' => 'Record not found.!',
                ];
                return response()->json($response);
            }
            $service->delete();

            $response = [
                'status' => true,
                'notification' => 'Gallery Deleted successfully!',
            ];
        } else {
            $response = [
                'status' => false,
                'notification' => 'You wont delete all data of the gallery!',
            ];
        }


        return response()->json($response);
    } 
    
    
    public function update(Request $request) {

        $validator = Validator::make($request->all(), [
            'slug' => 'required',
            'page_name' => 'required',           
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'notification' => $validator->errors()->all()
            ], 200);
        }
    
        $id = $request->input('id');
        $old_data = DB::table('gallery')->where('id', $id)->get()->first();

        $slug = customSlug($request->input('slug'));

        if($old_data !== null && !empty($old_data)){
            $old_data_Images = json_decode($old_data->images, true);
            $old_data_video = json_decode($old_data->videos, true);
            $old_data_img_description = json_decode($old_data->image_description, true);
            $next = true;
            $next1 = true;
            $next2 = true;
        }
    
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store('assets/banner', 'public');
        } else {
            $bannerPath = $old_data->banner;
        }
        
        if ($request->hasFile('thum_image')) {
            $thum_imagePath = $request->file('thum_image')->store('assets/thum_images', 'public');
        } else {
            $thum_imagePath = $old_data->thum_image;
        }

        /*--------------------------- Image --------------------------------------- */
        $oldImages = $request->input('old_images', []);
        $oldImageNumbers = $request->input('images_number', []);
        $Images = [];
        $newImage = [];
        
        // Handle new images upload
        if ($request->has('images')) {
            foreach ($request->file('images') as $index => $file) {
                $ImagePath = $file->store('assets/gallery/images', 'public');
                $newImage[$index] = $ImagePath;
            }
        }
        
        // Process old and new images
        foreach ($oldImageNumbers as $row) {
            // If both new image and old image are empty, skip this entry
            if (empty($newImage[$row]) && empty($oldImages[$row])) {
                continue; // Skip this iteration
            }
        
            // Check if new image exists, otherwise fallback to old image
            if (isset($newImage[$row])) {
                $Images[$row] = $newImage[$row];
            } else {
                $Images[$row] = $oldImages[$row] ?? null;
            }
        }
        
        // If no images are found, store an empty array
        if (empty($Images)) {
            $Images = []; // Store empty array if no images exist
        }

        // var_dump($oldImages);
        // var_dump($newImage);
        // var_dump($Images);
        // exit();

           // Retrieve old images and their numbers
    // $oldImages = $request->input('old_images', []);
    // $oldImageNumbers = $request->input('images_number', []);

    // // Initialize an array to store the final list of images
    // $finalImages = [];

    // // Process new uploaded images
    // if ($request->hasFile('images')) {
    //     foreach ($request->file('images') as $index => $file) {
    //         if ($file->isValid()) {
    //             // Store the new image
    //             $newImagePath = $file->store('assets/gallery/images', 'public');
    //             // Use the temporary index for ordering, or use count for new images
    //             $newImageIndex = $request->input('images_number')[$index] ?? count($finalImages);
    //             // Place the new image at the correct index
    //             $finalImages[$newImageIndex] = $newImagePath;
    //         }
    //     }
    // }

    // // Add old images that are not replaced by new uploads
    // foreach ($oldImageNumbers as $index => $oldImageNumber) {
    //     // Ensure that the old image is kept if it hasn't been replaced
    //     if (!isset($finalImages[$oldImageNumber]) && isset($oldImages[$index])) {
    //         $finalImages[$oldImageNumber] = $oldImages[$index];
    //     }
    // }

    // // Remove any null values from the finalImages array
    // $finalImages = array_filter($finalImages, function($value) {
    //     return $value !== null;
    // });

    // // Sort finalImages by index to preserve the order
    // ksort($finalImages);

    // // Ensure that $Images is an empty array if it is empty
    // $Images = !empty($finalImages) ? $finalImages : [];

        /*--------------------------- video --------------------------------------- */

        // Get all video URLs from the request
        $videos_urls = $request->input('gallery_videos', []);

        // Ensure the video URLs array is properly initialized
        // Remove any null or empty values from the URLs array
        $videos_urls = array_filter($videos_urls, function($value) {
            return !empty($value);
        });

        // Ensure that $videos_urls is an empty array if no valid URLs are available
        $videos_urls = !empty($videos_urls) ? $videos_urls : [];

        // $video = [];

        // $newvideo = [];
        // if($request->has('gallery_videos')){
        //     foreach ($request->file('gallery_videos') as $index => $file) {
        //         $VideoPath = $file->store('assets/video', 'public');
        //         $newvideo[$index] = $VideoPath;
        //     }
        // }

        // $number_video = $request->input('number_video');
        // foreach ($number_video as $key => $row) {

        //     if (isset($newvideo[$key])) {
        //         $video[$key] = $newvideo[$key];
        //     } else {

        //         $old = "old_video$key";
        //         if($request->has($old)){

        //             if($next1 == true){
        //                 $video[$key] = $old_data_video[$key] ?? null;
        //             } else {
        //                 $privous1 = $key + 1;
        //                 $video[$key] = $old_data_video[$privous1] ?? null;
        //             }
                    
        //         } else {
        //             $next1 = false;
        //             $privous1 = $key + 1;
        //             $video[$key] = $old_data_video[$privous1] ?? null;
        //         }
        //     }


        // }

        /*--------------------------- img_description --------------------------------------- */

        // Initialize arrays
        $image_description = [];
        $newimage_description_img = [];

        // Handle new image descriptions
        if ($request->has('image_description')) {
            foreach ($request->file('image_description') as $index => $file) {
                $imagePath = $file->store('assets/image_description', 'public');
                $newimage_description_img[$index] = $imagePath;
            }
        }

        // Retrieve existing image descriptions if no new images are provided
        $number_img_description = $request->input('number_img_description', []);
        foreach ($number_img_description as $key => $row) {
            if (isset($newimage_description_img[$key])) {
                $image_description[$key] = $newimage_description_img[$key];
            } else {
                $oldKey = "old_image_description$key";
                if ($request->has($oldKey)) {
                    $image_description[$key] = $old_data_img_description[$key]['image'] ?? null;
                } else {
                    $next2 = false;
                    $privous2 = $key + 1;
                    $image_description[$key] = $old_data_img_description[$privous2]['image'] ?? null;
                }
            }
        }

        // Prepare image description data
        $text = $request->input('image_description_text', []);
        $image_description_data = [];

        for ($i = 0; $i < count($text); $i++) {
            if (isset($text[$i]) || isset($image_description[$i])) {
                $image_description_data[$i] = [
                    'text' => $text[$i] ?? null,
                    'image' => $image_description[$i] ?? null,
                ];
            }
        }

        // Filter out rows where both 'text' and 'image' are null
        $image_description_data = array_filter($image_description_data, function($item) {
            return !is_null($item['text']) || !is_null($item['image']);
        });

        
        try {
            // Perform the database update
            
            $result = DB::table('gallery')->where('id', $id)->update([
                'slug' => $slug,
                'page_name' => $request->input('page_name'),
                'banner' => $bannerPath ?? null,
                'thum_image' => $thum_imagePath ?? null,
                'title' => $request->input('title') ?? null,
                'videos' => json_encode($videos_urls) ?? null,
                'short_description' => $request->input('short_description') ?? null,
                'image_description' => json_encode($image_description_data),
                'images' => json_encode($Images),
                //'images' => json_encode(array_values($Images)) ?? null,
                // 'videos' => json_encode(array_values($video)),
            ]);
        
            if ($result) {
                $response = [
                    'status' => true,
                    'notification' => 'Gallery updated successfully!',
                ];
            } else {
                $response = [
                    'status' => false,
                    'notification' => 'No changes were made.',
                ];
            }
        } catch (\Exception $e) {
            // Retrieve and log the last SQL error
            $error = DB::getPdo()->errorInfo();
            $response = [
                'status' => false,
                'notification' => 'Something went wrong! SQL Error: ' . $error[2],
            ];
            // Optionally, log the error for debugging purposes
            \Log::error('SQL Error: ' . $error[2]);
        }
        
        return response()->json($response);
        
    }
    
    
    
    /*public function update(Request $request) {

        $validator = Validator::make($request->all(), [
            'slug' => 'required',
            'page_name' => 'required',
            'banner' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'thum_image' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'title' => 'required',
            'short_description' => 'required',
            'image_description.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'images' => 'nullable',
            'gallery_videos' => 'required',
           
        ], [
            'banner.required' => 'The banner image is required.',
            'banner.image' => 'The banner must be an image.',
            'banner.mimes' => 'The banner must be a file of type: jpeg, png, jpg, webp.',
            'banner.max' => 'The banner may not be greater than 2 MB.',

            'thum_image.required' => 'The thum image image is required.',
            'thum_image.image' => 'The thum image must be an image.',
            'thum_image.mimes' => 'The thum image must be a file of type: jpeg, png, jpg, webp.',
            'thum_image.max' => 'The thum image may not be greater than 2 MB.',
            
            'images.required' => 'The image image is required.',
            'images.image' => 'The image must be an image.',
            'images.mimes' => 'The image must be a file of type: jpeg, png, jpg, webp.',
            'images.max' => 'The image may not be greater than 2 MB.',

            'slug.required' => 'The slug is required.',
    
            'title.required' => 'The title is required.',

            'short_description.required' => 'The Short Description is required.',
            
            'gallery_videos.required' => 'The Video is required.',

            'page_name.required' => 'The page name is required.',
    
            'image_description.*.required' => 'The gallery images are required.',
            'image_description.*.image' => 'Each gallery image must be an image.',
            'image_description.*.mimes' => 'Each gallery image must be a file of type: jpeg, png, jpg, webp.',
            'image_description.*.max' => 'Each gallery image may not be greater than 2 MB.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'notification' => $validator->errors()->all()
            ], 200);
        }

        $id = $request->input('id');
        $old_data = DB::table('gallery')->where('id', $id)->get()->first();

        $slug = customSlug($request->input('slug'));

        if($old_data !== null && !empty($old_data)){
            $old_data_Images = json_decode($old_data->images, true);
            $old_data_video = json_decode($old_data->videos, true);
            $old_data_img_description = json_decode($old_data->image_description, true);
            $next = true;
            $next1 = true;
            $next2 = true;
        }
    
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store('assets/banner', 'public');
        } else {
            $bannerPath = $old_data->banner;
        }
        
        if ($request->hasFile('thum_image')) {
            $thum_imagePath = $request->file('thum_image')->store('assets/thum_images', 'public');
        } else {
            $thum_imagePath = $old_data->thum_image;
        }
*/
        /*--------------------------- Image --------------------------------------- */
/*
        $Images = [];

        $newImage = [];
        if($request->has('images')){
            foreach ($request->file('images') as $index => $file) {
                $ImagePath = $file->store('assets/gallery/images', 'public');
                $newImage[$index] = $ImagePath;
            }
        }

        $number_img = $request->input('number_img');
        foreach ($number_img as $key => $row) {

            if (isset($newImage[$key])) {
                $Images[$key] = $newImage[$key];
            } else {

                $old = "old_image$key";
                if($request->has($old)){

                    if($next == true){
                        $Images[$key] = $old_data_Images[$key] ?? null;
                    } else {
                        $privous = $key + 1;
                        $Images[$key] = $old_data_Images[$privous] ?? null;
                    }
                    
                } else {
                    $next = false;
                    $privous = $key + 1;
                    $Images[$key] = $old_data_Images[$privous] ?? null;
                }
            }


        }

*/
        /*--------------------------- video --------------------------------------- */
/*
        // Get all video URLs from the request
        $videos_urls = $request->input('gallery_videos');



        // $video = [];

        // $newvideo = [];
        // if($request->has('gallery_videos')){
        //     foreach ($request->file('gallery_videos') as $index => $file) {
        //         $VideoPath = $file->store('assets/video', 'public');
        //         $newvideo[$index] = $VideoPath;
        //     }
        // }

        // $number_video = $request->input('number_video');
        // foreach ($number_video as $key => $row) {

        //     if (isset($newvideo[$key])) {
        //         $video[$key] = $newvideo[$key];
        //     } else {

        //         $old = "old_video$key";
        //         if($request->has($old)){

        //             if($next1 == true){
        //                 $video[$key] = $old_data_video[$key] ?? null;
        //             } else {
        //                 $privous1 = $key + 1;
        //                 $video[$key] = $old_data_video[$privous1] ?? null;
        //             }
                    
        //         } else {
        //             $next1 = false;
        //             $privous1 = $key + 1;
        //             $video[$key] = $old_data_video[$privous1] ?? null;
        //         }
        //     }


        // }
*/
        /*--------------------------- img_description --------------------------------------- */
/*
        $image_description = [];

        $newimage_description_img = [];
        if($request->has('image_description')){
            foreach ($request->file('image_description') as $index => $file) {
                $VideoPath = $file->store('assets/image_description', 'public');
                $newimage_description_img[$index] = $VideoPath;
            }
        }

        $number_img_description = $request->input('number_img_description');
        foreach ($number_img_description as $key => $row) {

            if (isset($newimage_description_img[$key])) {
                $image_description[$key] = $newimage_description_img[$key];
            } else {

                $old = "old_image_description$key";
                if($request->has($old)){

                    if($next2 == true){
                        $image_description[$key] = $old_data_img_description[$key]['image'] ?? null;
                    } else {
                        $privous2 = $key + 1;
                        $image_description[$key] = $old_data_img_description[$privous2]['image'] ?? null;
                    }
                    
                } else {
                    $next2 = false;
                    $privous2 = $key + 1;
                    $image_description[$key] = $old_data_img_description[$privous2]['image'] ?? null;
                }
            }


        }

        $text = $request->input('image_description_text');
        $image_description_data = [];

        for ($i = 0; $i < count($text); $i++) {
            $image_description_data[$i] = [
                'text' => $text[$i],
                'image' => $image_description[$i],
            ];
        }



        $result = DB::table('gallery')->where('id', $id)->update([
            'slug' => $slug,
            'page_name' => $request->input('page_name'),
            'banner' => $bannerPath,
            'thum_image' => $thum_imagePath,
            'title' => $request->input('title'),
            'videos' => json_encode($videos_urls),
            'short_description' => $request->input('short_description'),
            'image_description' => json_encode($image_description_data),
            'images' => json_encode(array_values($Images)),
            // 'videos' => json_encode(array_values($video)),
        ]);
        
        if($result){
            $response = [
                'status' => true,
                'notification' => 'Gallery Update successfully!',
            ];
        } else {
            $response = [
                'status' => false,
                'notification' => 'Somthing Went Wrong!',
            ];
        }

        return response()->json($response);
    }
*/



/* ------------------------------------------------------------------------------------------------ */


   


    /*
    public function status($id, $status) { 
        $award = Award::find($id);
        $award->status = $status;
        $award->save();
    
        return redirect(route('award.index'))->with('success', 'Status Change successfully!');
    }  
    */





}
