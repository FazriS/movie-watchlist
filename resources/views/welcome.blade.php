<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100 dark:bg-[#0a0a0a] text-[#1b1b18] flex items-center justify-center min-h-screen">

    <div class="w-full max-w-7xl px-6 lg:px-8">

        <main class="mt-6">

            <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">

                <div class="flex flex-col justify-center">

                    <h1 class="text-5xl font-bold text-[#f53003]">
                        Laravel 13
                    </h1>

                    <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
                        Selamat datang di project Laravel Anda 🚀
                    </p>

                    <ul class="mt-8 flex flex-col gap-4 text-sm">

                        <li>
                            <a href="https://laravel.com/docs"
                               target="_blank"
                               class="inline-flex items-center gap-2 text-[#f53003] hover:underline">

                                Documentation

                                <svg
                                    width="10"
                                    height="11"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-2.5 h-2.5"
                                >
                                    <path
                                        d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                        stroke="currentColor"
                                        stroke-linecap="square"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="https://laracasts.com"
                               target="_blank"
                               class="inline-flex items-center gap-2 text-[#f53003] hover:underline">

                                Laracasts

                                <svg
                                    width="10"
                                    height="11"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-2.5 h-2.5"
                                >
                                    <path
                                        d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                        stroke="currentColor"
                                        stroke-linecap="square"
                                    />
                                </svg>
                            </a>
                        </li>

                    </ul>

                    <ul class="mt-8 flex gap-3 text-sm">

                        <li>
                            <a href="https://cloud.laravel.com"
                               target="_blank"
                               class="inline-block px-5 py-2 bg-[#1b1b18] text-white rounded hover:bg-black">

                                Deploy now
                            </a>
                        </li>

                    </ul>

                    <p class="mt-10 text-gray-500">
                        v{{ app()->version() }}

                        <a href="https://github.com/laravel/laravel/blob/13.x/CHANGELOG.md"
                           target="_blank"
                           class="inline-flex items-center gap-1 ml-2 text-[#f53003] underline">

                            View changelog

                            <svg
                                width="10"
                                height="11"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-2.5 h-2.5"
                            >
                                <path
                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                    stroke="currentColor"
                                    stroke-linecap="square"
                                />
                            </svg>
                        </a>
                    </p>

                </div>

                <div class="bg-[#fff2f2] dark:bg-[#1D0002] rounded-2xl overflow-hidden flex items-center justify-center p-10 shadow-lg">

                    <svg
                        class="w-full max-w-md text-[#F53003]"
                        viewBox="0 0 438 104"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.2036 -3H0V102.197H49.5189V86.7187H17.2036V-3Z" fill="currentColor" />
                        <path d="M110.256 41.6337C108.061 38.1275 104.945 35.3731 100.905 33.3681C96.8667 31.3647 92.8016 30.3618 88.7131 30.3618C83.4247 30.3618 78.5885 31.3389 74.201 33.2923C69.8111 35.2456 66.0474 37.928 62.9059 41.3333C59.7643 44.7401 57.3198 48.6726 55.5754 53.1293C53.8287 57.589 52.9572 62.274 52.9572 67.1813C52.9572 72.1925 53.8287 76.8995 55.5754 81.3069C57.3191 85.7173 59.7636 89.6241 62.9059 93.0293C66.0474 96.4361 69.8119 99.1155 74.201 101.069C78.5885 103.022 83.4247 103.999 88.7131 103.999C92.8016 103.999 96.8667 102.997 100.905 100.994C104.945 98.9911 108.061 96.2359 110.256 92.7282V102.195H126.563V32.1642H110.256V41.6337Z" fill="currentColor" />
                        <path d="M438 -3H421.694V102.197H438V-3Z" fill="currentColor" />
                    </svg>

                </div>

            </div>

        </main>

    </div>

</body>
</html>