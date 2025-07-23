<script lang="ts">
    import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
    import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
    let { data, children } = $props();
</script>

<SignedIn>
    <div class="flex flex-col items-center justify-center h-screen bg-[#242529]">
        <div class="flex flex-col w-full sm:w-auto h-full sm:aspect-[9/16] py-4">
            <div class="grid grid-cols-4 gap-6">

                <button class="bg-zinc-700 py-2 px-4 rounded-full flex items-center justify-center">
                    <svg class="text-yellow-200 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path opacity="1" d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg>
                </button>

                <div></div>
                <div></div>

                <button class="bg-zinc-700 py-2 px-4 rounded-full flex items-center justify-center">
                    <svg class="text-white size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path opacity="1" d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                </button>

            </div>
            {@render children?.()}
        </div>
    </div>
</SignedIn>

<SignedOut>
    <a href="/auth/login">Login</a>
</SignedOut>