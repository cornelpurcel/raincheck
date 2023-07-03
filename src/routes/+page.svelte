<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	// TEST WITH ASSA MOROCCO

	type City = {
		city: string;
		admin_name: string;
		city_ascii: string;
		country: string;
		iso2: string;
		iso3: string;
		lat: number;
		lng: number;
	};
	type PrecipitationResults = {
		dates: Date[];
		values: number[];
	};

	// const handleMouse = (e: WheelEvent) => {
	// const entriesScrolled = Math.floor(e.deltaY / 54);

	// startIndex = startIndex + entriesScrolled;
	// startIndex =
	// 	startIndex < 0
	// 		? 0
	// 		: startIndex > filteredCitiesLength - entriesAtATime
	// 		? filteredCitiesLength - entriesAtATime
	// 		: startIndex;
	// endIndex = endIndex + entriesScrolled;
	// endIndex =
	// 	endIndex < entriesAtATime
	// 		? entriesAtATime
	// 		: endIndex > filteredCitiesLength
	// 		? filteredCitiesLength
	// 		: endIndex;
	// 	console.log('deltaY:', e.deltaY);
	// 	console.log('MOUSE EVENT');
	// };

	// const citiesPromise =
	//     fetch("./worldcities.json")
	//     .then((response) => response.json())
	async function getAllCities(): Promise<City[]> {
		const res = await fetch('./worldcities.json');
		const cities: City[] = await res.json();
		return cities.sort((a: City, b: City) =>
			a.city_ascii < b.city_ascii ? -1 : a.city_ascii > b.city_ascii ? 1 : 0
		);
	}

	let mounted = false;

	const entriesAtATime = 10;
	let userCityInput: string = '';
	let allCities: City[] = [];
	let listActive = false;
	let finalChoice: City;
	let startIndex = 0;
	let endIndex = entriesAtATime;

	let resultString = '';

	const pastDays = 61;

	let selectedEntryIndex = -1; // which entry is focused by keyboard

	onMount(async () => {
		allCities = await getAllCities();
		mounted = true;
	});

	$: filteredCities = allCities.filter((city) =>
		city.city_ascii.toLowerCase().startsWith(userCityInput.toLowerCase())
	);
	$: filteredCitiesWindow = filteredCities.slice(startIndex, endIndex);
	$: allCitiesLength = allCities.length;
	$: filteredCitiesLength = filteredCities.length;
	$: listOpen = mounted && filteredCitiesWindow.length > 0 && listActive;

	const chooseCity = (city: City) => {
		finalChoice = city;
		userCityInput = city.city_ascii;
		unfocusAutocomplete();
	};

	const unfocusAutocomplete = () => {
		selectedEntryIndex = -1;
		listActive = false;
		document.getElementById('city-select')?.blur();
		document.getElementById('user-chose')?.focus();
	};

	const handleFocus = () => {
		listActive = true;
	};
	function getFlagEmoji(countryCode: string) {
		const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}

	const getCityString = (city: City) => {
		if (city) return `${getFlagEmoji(city.iso2)} ${city.city}, ${city.admin_name}`;

		return 'NOTHING';
	};

	let autocompleteListEl: HTMLElement;
	let autocompleteForm: HTMLElement;

	const getResults = async (city: City): Promise<PrecipitationResults> => {
		const lat = city.lat;
		const long = city.lng;
		const dataEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=precipitation_sum&timezone=GMT&past_days=${pastDays}&forecast_days=1`;
		const response = await fetch(dataEndpoint, { cache: 'default' });
		const data = await response.json();
		console.log(data);
		const parsedDates = data.daily.time.map((val: string) => new Date(val));
		return {
			values: data.daily.precipitation_sum,
			dates: parsedDates
		};
	};

	const getLatestPrecipitationDate = (precipitations: PrecipitationResults) => {
		for (let i = precipitations.values.length - 1; i > 0; i--) {
			if (precipitations.values[i] > 0) {
				return precipitations.dates[i];
			}
		}
		return null;
	};

	const getResultString = (latestPrecipitation: Date | undefined | null, city: string) => {
		if (!latestPrecipitation) {
			return "It hasn't rained for more than 2 months...";
		}
		const today = new Date();
		const diffMilliseconds = today.valueOf() - latestPrecipitation.valueOf();
		console.log(diffMilliseconds);
		console.log('latest:', latestPrecipitation);
		const diffDays = Math.floor(diffMilliseconds / 1000 / 60 / 60 / 24);

		if (diffDays === 0) {
			return `Looks like ${city} got rain today! 🥳`;
		}
		if (diffDays === 1) {
			return `Looks like it has rained yesterday in ${city}! 🌳`;
		}
		if (diffDays < 7) {
			return `Looks like ${city} has got some rain in the past week! 🍃`;
		}
		return `Looks like it has been ${diffDays} days since the last rain in ${city} 🥵`;
	};

	const test = async () => {
		const precipitations = await getResults(finalChoice);
		const latestPrecipitation = getLatestPrecipitationDate(precipitations);

		resultString = getResultString(latestPrecipitation, finalChoice.city);
		console.log(resultString);
	};

	const handleGlobalClick = (event: MouseEvent) => {
		const isClickInsideList = autocompleteForm?.contains(event.target as Node) ?? false;

		if (!isClickInsideList) {
			listActive = false;
		}
		// if ((e.target as HTMLElement).closest('.autocomplete') === null) {
		// 	console.log('not clsoest');
		// }
	};

	const handleInputKeys = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			unfocusAutocomplete();
		} else if (event.key === 'ArrowDown') {
			const visibleEntries = Math.min(entriesAtATime, filteredCitiesLength);
			selectedEntryIndex += 1;
			selectedEntryIndex =
				selectedEntryIndex >= visibleEntries ? visibleEntries - 1 : selectedEntryIndex;
		} else if (event.key === 'ArrowUp') {
			selectedEntryIndex -= 1;
			selectedEntryIndex = selectedEntryIndex < -1 ? -1 : selectedEntryIndex;
		} else if (event.key === 'Enter') {
			selectedEntryIndex = 0;
			chooseCity(filteredCitiesWindow[selectedEntryIndex]);
		}
	};

	const handleSubmit = () => {
		console.log('submitted city:', finalChoice);
	};

	// onMount(() => {
	// 	document.addEventListener('click', handleGlobalClick);
	// });

	// onDestroy(() => document.removeEventListener('click', handleGlobalClick));
</script>

<svelte:document on:click={handleGlobalClick} />
<div class="main">
	<h1>Welcome to raincheck</h1>
	<p>number of cities: {allCitiesLength}</p>
	<p>number of filtered cities: {filteredCitiesLength}</p>

	<form bind:this={autocompleteForm} id="autocomplete-form" on:submit|preventDefault={handleSubmit}>
		<div class="autocomplete">
			<input
				autocomplete="off"
				on:keydown={handleInputKeys}
				on:focus={handleFocus}
				on:change={() => {
					startIndex = 0;
					endIndex = entriesAtATime;
				}}
				placeholder="Search City"
				id="city-select"
				type="text"
				bind:value={userCityInput}
			/>
		</div>

		{#if listOpen}
			<ul id="autocomplete-items-list" bind:this={autocompleteListEl}>
				{#each filteredCitiesWindow as city, index}
					<li
						class="autocomplete-items"
						class:selected={index === selectedEntryIndex}
						on:click={() => chooseCity(city)}
					>
						{getCityString(city)}
					</li>
					<!-- {#each { length: 80 } as _, i} -->
					<!-- <p>{i}, {filteredCities.length}</p> -->
					<!-- {#if i < filteredCities.length} -->
					<!-- <option value={city.city}>
						{city.city}
					</option> -->
					<!-- {/if} -->
				{/each}
			</ul>
			<!-- <select on:wheel={handleMouse} /> -->
		{/if}
		<!-- <button type="submit">Test</button> -->
	</form>
	<p id="user-chose">User chose: {getCityString(finalChoice)}</p>
	<button disabled={!finalChoice} on:click={test}>test</button>
	{#if resultString}
		<div>
			<span>{resultString}</span>
		</div>
	{/if}
</div>

<style>
	/* RESETS */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	*:focus {
		outline: 3px dashed #228bec;
		outline-offset: 0.2rem;
	}
	html {
		font: 62.5% / 1.15 sans-serif;
	}
	h1,
	h2 {
		margin-bottom: 0;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	button {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		line-height: normal;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		appearance: none;
	}
	button::-moz-focus-inner {
		border: 0;
	}
	button,
	input,
	optGroup,
	select,
	textarea {
		font-family: inherit;
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
	}
	button,
	input {
		overflow: visible;
	}
	input[type='text'] {
		border-radius: 0;
	}
	body {
		width: 100%;
		max-width: 68rem;
		margin: 0 auto;
		font: 1.6rem/1.25 Arial, sans-serif;
		background-color: #f5f5f5;
		color: #4d4d4d;
	}
	@media screen and (min-width: 620px) {
		body {
			font-size: 1.9rem;
			line-height: 1.31579;
		}
	}
	/* END RESETS */
	input {
		border: 2px black solid;
		line-height: 1.5rem;
		padding: 0.3rem;
		width: 100%;
	}
	button {
		background-color: #7c7c7c;
		padding: 0.3rem;
		cursor: pointer;
		border: 2px lightgrey solid;
	}

	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
	}

	li.autocomplete-items:hover {
		background-color: #228bec;
	}

	li.autocomplete-items.selected {
		background-color: #1a63a8;
	}

	#autocomplete-items-list {
		position: absolute;
		margin: 0;
		padding: 0;
		top: 2.3rem;
		width: 15rem;
		/* max-height: 20rem; */
		border: 1px solid #ddd;
		background-color: #ddd;
	}

	div.autocomplete {
		position: relative;
		display: inline-block;
		width: 15rem;
	}

	#autocomplete-form {
		position: relative;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
